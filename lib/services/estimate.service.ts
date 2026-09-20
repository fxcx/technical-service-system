/**
 * Estimate Service (Presupuestos) — TechService
 * Documentación: docs/presupuestos.md, docs/reglas-negocio.md
 *
 * Reglas clave:
 * - Solo el Técnico asignado puede enviar un presupuesto.
 * - Solo el Administrador puede aprobarlo o rechazarlo.
 * - Máximo 1 presupuesto activo por orden.
 */
import { db } from "@/lib/prisma";
import { logActivity, ACTIONS } from "./activity-log.service";
import { nowInstant } from "@/lib/utils";
import type { Estimate, EstimateFilters, SessionUser } from "@/types";
import type { z } from "zod";
import type { createEstimateSchema } from "@/lib/validations";

export type CreateEstimateInput = z.infer<typeof createEstimateSchema>;

function applyFullInclude(query: any) {
  return query.include("service", (s: any) => 
    s.include("client", (c: any) => c)
     .include("technician", (t: any) => 
        t.select("id", "name", "email", "phone", "role", "isActive", "avatar", "createdAt", "updatedAt")
     )
  );
}

export async function listEstimates(
  filters: EstimateFilters,
  session: SessionUser,
): Promise<Estimate[]> {
  let query: any = db.orm.public.Estimate;

  const techId = session.role === "TECHNICIAN" ? session.id : filters.technicianId;
  
  if (techId) {
    const serviceIds = await db.orm.public.Service
      .where({ technicianId: techId })
      .select("id")
      .all()
      .then((res: any[]) => res.map(r => r.id));
      
    if (serviceIds.length === 0) return [];
    query = query.where((m: any) => m.serviceId.in(serviceIds));
  }

  if (filters.status) {
    query = query.where({ status: filters.status });
  }

  return applyFullInclude(query)
    .orderBy((e: any) => e.createdAt.desc())
    .all() as unknown as Promise<Estimate[]>;
}

export async function getEstimateById(
  id: string,
  session: SessionUser,
): Promise<Estimate | null> {
  let query: any = db.orm.public.Estimate;
  query = applyFullInclude(query);
  
  const estimate = await query.first({ id });
  if (!estimate) return null;

  if (session.role === "TECHNICIAN" && estimate.service?.technicianId !== session.id) {
    throw new Error("Sin permisos para ver este presupuesto");
  }

  return estimate as unknown as Estimate;
}

export async function getEstimateByService(
  serviceId: string,
): Promise<Estimate | null> {
  let query: any = db.orm.public.Estimate;
  return applyFullInclude(query).first({ serviceId }) as unknown as Promise<Estimate | null>;
}

export async function createEstimate(
  data: CreateEstimateInput,
  session: SessionUser,
): Promise<Estimate> {
  const service = await db.orm.public.Service.first({ id: data.serviceId });
  if (!service) throw new Error("Orden no encontrada");

  // Solo el técnico asignado puede enviar presupuesto
  if (session.role === "TECHNICIAN" && service.technicianId !== session.id) {
    throw new Error(
      "Sin permisos: solo podés enviar presupuestos de tus propias órdenes",
    );
  }

  // Solo 1 presupuesto por orden (docs/presupuestos.md)
  const existing = await db.orm.public.Estimate.first({ serviceId: data.serviceId });
  if (existing) {
    throw new Error(
      "Esta orden ya tiene un presupuesto. No se puede crear otro.",
    );
  }

  const created = await db.orm.public.Estimate.create({
    serviceId: data.serviceId,
    amount: data.amount.toString(),
    description: data.description,
    notes: data.notes,
    status: "PENDING",
  });

  await logActivity(
    data.serviceId,
    session.id,
    ACTIONS.ESTIMATE_SENT,
    "Presupuesto enviado",
    {
      amount: data.amount,
    },
  );

  return applyFullInclude(db.orm.public.Estimate).first({ id: created.id }) as unknown as Promise<Estimate>;
}

export async function finalizeEstimate(
  id: string,
  session: SessionUser,
): Promise<Estimate> {
  if (session.role !== "ADMIN")
    throw new Error(
      "Solo un Administrador puede finalizar presupuestos",
    );

  const estimate = await db.orm.public.Estimate.first({ id });
  if (!estimate) throw new Error("Presupuesto no encontrado");
  if (estimate.status !== "PENDING")
    throw new Error("El presupuesto ya fue finalizado");

  await db.orm.public.Estimate.where({ id }).update({
    status: "COMPLETED",
    completedAt: nowInstant(),
  });

  await logActivity(
    estimate.serviceId,
    session.id,
    ACTIONS.ESTIMATE_FINALIZED,
    "Presupuesto finalizado",
  );

  return applyFullInclude(db.orm.public.Estimate).first({ id }) as unknown as Promise<Estimate>;
}
