/**
 * Service Service (Órdenes de Trabajo) — TechService
 * Documentación: .docs/modulos/services.md, .docs/reglas-negocio.md
 *
 * Reglas clave:
 * - El Administrador crea y gestiona. El Técnico solo opera sus propias órdenes.
 * - Los servicios NUNCA se eliminan físicamente (soft delete → CANCELLED).
 * - Cada cambio importante se registra en ActivityLog.
 */
import { db } from "@/lib/prisma";
import { logActivity, ACTIONS } from "./activity-log.service";
import { toInstant, nowInstant } from "@/lib/utils";
import type { Service, ServiceFilters, SessionUser } from "@/types";
import type { z } from "zod";
import type {
  createServiceSchema,
  updateServiceSchema,
  updateStatusSchema,
  finishServiceSchema,
} from "@/lib/validations";

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
export type FinishServiceInput = z.infer<typeof finishServiceSchema>;

const USER_SELECT_FIELDS = [
  "id", "name", "email", "phone", "dni", "role", 
  "isActive", "avatar", "createdAt", "updatedAt"
] as const;

function applyFullInclude(query: any) {
  return query
    .include("company", (c: any) => c)
    .include("client", (c: any) => c)
    .include("category", (c: any) => c)
    .include("technician", (t: any) => t.select(...USER_SELECT_FIELDS))
    .include("createdBy", (u: any) => u.select(...USER_SELECT_FIELDS))
    .include("closedBy", (u: any) => u.select(...USER_SELECT_FIELDS))
    .include("payment", (p: any) => p)
    .include("estimate", (e: any) => e)
    .include("parts", (p: any) => 
       p.include("inventoryItem", (i: any) => i.select("id", "name", "code", "unit"))
        .orderBy((x: any) => x.createdAt.asc())
    )
    .include("activityLogs", (a: any) => 
       a.include("user", (u: any) => u.select("id", "name", "role"))
        .orderBy((x: any) => x.createdAt.asc())
    );
}

function applyFilters(query: any, filters: ServiceFilters, session: SessionUser) {
  let q = query;

  if (session.role === "TECHNICIAN") {
    q = q.where({ technicianId: session.id });
  } else {
    if (filters.technicianId) q = q.where({ technicianId: filters.technicianId });
    if (filters.clientId) q = q.where({ clientId: filters.clientId });
    if (filters.companyId) q = q.where({ companyId: filters.companyId });
    if (filters.categoryId) q = q.where({ categoryId: filters.categoryId });
  }

  if (filters.status) q = q.where({ status: filters.status });

  if (filters.dateFrom) q = q.where((s: any) => s.scheduledDate.gte(toInstant(filters.dateFrom!)));
  if (filters.dateTo) q = q.where((s: any) => s.scheduledDate.lte(toInstant(filters.dateTo!)));

  return q;
}

export async function listServices(
  filters: ServiceFilters,
  session: SessionUser,
): Promise<Service[]> {
  let query: any = db.orm.public.Service;
  query = applyFilters(query, filters, session);
  return applyFullInclude(query)
    .orderBy((s: any) => s.scheduledDate.desc())
    .all() as unknown as Promise<Service[]>;
}

export async function getServiceById(
  id: string,
  session: SessionUser,
): Promise<Service | null> {
  const service = await applyFullInclude(db.orm.public.Service).first({ id });

  if (!service) return null;

  if (session.role === "TECHNICIAN" && service.technicianId !== session.id) {
    throw new Error("Sin permisos para ver esta orden");
  }

  return service as unknown as Service;
}

export async function createService(
  data: CreateServiceInput,
  session: SessionUser,
): Promise<Service> {
  if (session.role !== "ADMIN")
    throw new Error("Solo un Administrador puede crear órdenes");

  const created = await db.orm.public.Service.create({
    companyId: data.companyId,
    clientId: data.clientId,
    categoryId: data.categoryId,
    technicianId: data.technicianId as string,
    scheduledDate: toInstant(data.scheduledDate),
    address: data.address,
    locality: data.locality,
    observation: data.observation ?? undefined,
    expectedAmount: data.expectedAmount ? data.expectedAmount.toString() : undefined,
    finalAmount: (data.finalAmount ?? 0).toString(),
    status: "PENDING",
    createdById: session.id,
  });

  await logActivity(
    created.id,
    session.id,
    ACTIONS.SERVICE_CREATED,
    "Orden creada",
    { clientId: data.clientId, technicianId: data.technicianId },
  );

  if (data.technicianId) {
    await logActivity(
      created.id,
      session.id,
      ACTIONS.SERVICE_TECHNICIAN_ASSIGNED,
      "Técnico asignado",
      { technicianId: data.technicianId },
    );
  }

  return applyFullInclude(db.orm.public.Service).first({ id: created.id }) as unknown as Promise<Service>;
}

export async function updateService(
  id: string,
  data: UpdateServiceInput,
  session: SessionUser,
): Promise<Service> {
  if (session.role !== "ADMIN")
    throw new Error("Solo un Administrador puede modificar órdenes");

  const existing = await db.orm.public.Service.first({ id });
  if (!existing) throw new Error("Orden no encontrada");
  if (existing.status === "CLOSED")
    throw new Error("No se puede modificar una orden cerrada");

  const prevTechnicianId = existing.technicianId;

  const updateData: any = {};
  if (data.companyId) updateData.companyId = data.companyId;
  if (data.clientId) updateData.clientId = data.clientId;
  if (data.categoryId) updateData.categoryId = data.categoryId;
  if (data.technicianId !== undefined) updateData.technicianId = data.technicianId;
  if (data.scheduledDate) updateData.scheduledDate = toInstant(data.scheduledDate);
  if (data.address !== undefined) updateData.address = data.address;
  if (data.locality !== undefined) updateData.locality = data.locality;
  if (data.observation !== undefined) updateData.observation = data.observation;
  if (data.expectedAmount !== undefined) updateData.expectedAmount = data.expectedAmount?.toString() ?? undefined;
  if (data.finalAmount !== undefined) updateData.finalAmount = data.finalAmount?.toString() ?? "0";

  await db.orm.public.Service.where({ id }).update(updateData);

  if (
    data.technicianId !== undefined &&
    data.technicianId !== prevTechnicianId
  ) {
    await logActivity(
      id,
      session.id,
      ACTIONS.SERVICE_TECHNICIAN_ASSIGNED,
      "Técnico modificado",
      { from: prevTechnicianId, to: data.technicianId },
    );
  }

  await logActivity(id, session.id, ACTIONS.SERVICE_UPDATED, "Orden actualizada", {
    fields: Object.keys(data),
  });

  return applyFullInclude(db.orm.public.Service).first({ id }) as unknown as Promise<Service>;
}

export async function updateServiceStatus(
  id: string,
  data: UpdateStatusInput,
  session: SessionUser,
): Promise<Service> {
  const existing = await db.orm.public.Service.first({ id });
  if (!existing) throw new Error("Orden no encontrada");

  if (session.role === "TECHNICIAN" && existing.technicianId !== session.id) {
    throw new Error("Sin permisos para modificar esta orden");
  }

  if (existing.status === "CLOSED")
    throw new Error("No se puede cambiar el estado de una orden cerrada");

  const updateData: any = { status: data.status };
  if (data.status === "COMPLETED") {
    updateData.completedAt = nowInstant();
  }

  await db.orm.public.Service.where({ id }).update(updateData);

  await logActivity(
    id,
    session.id,
    ACTIONS.SERVICE_STATUS_CHANGED,
    `Estado cambiado a ${data.status}`,
    { from: existing.status, to: data.status },
  );

  return applyFullInclude(db.orm.public.Service).first({ id }) as unknown as Promise<Service>;
}

/**
 * Cierra definitivamente una orden (status=CLOSED).
 * Solo el Administrador puede cerrar.
 * Requiere el monto final del servicio.
 */
export async function finishService(
  id: string,
  data: FinishServiceInput,
  session: SessionUser,
): Promise<Service> {
  if (session.role !== "ADMIN")
    throw new Error("Solo un Administrador puede cerrar órdenes");

  const existing = await db.orm.public.Service.first({ id });
  if (!existing) throw new Error("Orden no encontrada");
  if (existing.status === "CLOSED") throw new Error("La orden ya está cerrada");

  const updateData: any = {
    status: "CLOSED",
    closedAt: nowInstant(),
    closedById: session.id,
    finalAmount: data.finalAmount.toString(),
  };

  if (data.observation !== undefined) {
    updateData.observation = data.observation;
  }

  await db.orm.public.Service.where({ id }).update(updateData);

  await logActivity(id, session.id, ACTIONS.SERVICE_CLOSED, "Orden cerrada", {
    finalAmount: data.finalAmount,
  });

  return applyFullInclude(db.orm.public.Service).first({ id }) as unknown as Promise<Service>;
}

/**
 * Cancela una orden (soft delete).
 * Los servicios NUNCA se eliminan físicamente.
 */
export async function cancelService(
  id: string,
  session: SessionUser,
): Promise<Service> {
  if (session.role !== "ADMIN")
    throw new Error("Solo un Administrador puede cancelar órdenes");

  const existing = await db.orm.public.Service.first({ id });
  if (!existing) throw new Error("Orden no encontrada");
  if (existing.status === "CLOSED")
    throw new Error("No se puede cancelar una orden cerrada");

  await db.orm.public.Service.where({ id }).update({ status: "CANCELLED" });

  await logActivity(id, session.id, ACTIONS.SERVICE_CANCELLED, "Orden cancelada");

  return applyFullInclude(db.orm.public.Service).first({ id }) as unknown as Promise<Service>;
}
