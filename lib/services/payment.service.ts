/**
 * Payment Service (Cobros) — TechService
 * Documentación: .docs/modulos/services.md, .docs/reglas-negocio.md
 *
 * Reglas clave:
 * - Cada servicio puede tener UN ÚNICO cobro.
 * - Un cobro registra: método, monto cobrado, y deuda pendiente.
 * - Los repuestos ya NO pertenecen al cobro → ver service-part.service.ts
 * - Solo técnicos asignados pueden registrar cobros.
 */
import { db } from "@/lib/prisma";
import { logActivity, ACTIONS } from "./activity-log.service";
import { toInstant } from "@/lib/utils";
import type { Payment, PaymentFilters, SessionUser } from "@/types";
import type { z } from "zod";
import type {
  createPaymentSchema,
  updatePaymentSchema,
} from "@/lib/validations";

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>;

function applyFullInclude(query: any) {
  return query
    .include("service", (s: any) =>
      s.include("client", (c: any) => c)
       .include("company", (c: any) => c)
       .include("category", (c: any) => c)
    )
    .include("technician", (t: any) =>
      t.select(
        "id", "name", "email", "phone", "role",
        "isActive", "avatar", "createdAt", "updatedAt"
      )
    );
}

export async function listPayments(
  filters: PaymentFilters,
  session: SessionUser,
): Promise<Payment[]> {
  let query: any = db.orm.public.Payment;

  // Técnicos solo ven sus propios cobros
  if (session.role === "TECHNICIAN") {
    query = query.where({ technicianId: session.id });
  } else {
    if (filters.technicianId) {
      query = query.where({ technicianId: filters.technicianId });
    }
  }

  if (filters.dateFrom) {
    query = query.where((p: any) => p.createdAt.gte(toInstant(filters.dateFrom!)));
  }
  if (filters.dateTo) {
    query = query.where((p: any) => p.createdAt.lte(toInstant(filters.dateTo!)));
  }

  return applyFullInclude(query)
    .orderBy((p: any) => p.createdAt.desc())
    .all() as unknown as Promise<Payment[]>;
}

export async function getPaymentById(
  id: string,
  session: SessionUser,
): Promise<Payment | null> {
  const payment = await applyFullInclude(db.orm.public.Payment).first({ id });

  if (!payment) return null;

  // Técnico solo puede ver sus propios cobros
  if (session.role === "TECHNICIAN" && payment.technicianId !== session.id) {
    throw new Error("Sin permisos para ver este cobro");
  }

  return payment as unknown as Payment;
}

export async function getPaymentByService(
  serviceId: string,
): Promise<Payment | null> {
  return applyFullInclude(db.orm.public.Payment).first({ serviceId }) as unknown as Promise<Payment | null>;
}

export async function createPayment(
  data: CreatePaymentInput,
  session: SessionUser,
): Promise<Payment> {
  const service = await db.orm.public.Service.first({ id: data.serviceId });
  if (!service) throw new Error("Orden no encontrada");

  // Técnico solo puede cobrar sus propias órdenes
  if (session.role === "TECHNICIAN" && service.technicianId !== session.id) {
    throw new Error(
      "Sin permisos: solo podés registrar cobros de tus propias órdenes",
    );
  }

  // Verificar cobro duplicado
  const existingPayment = await db.orm.public.Payment.first({ serviceId: data.serviceId });
  if (existingPayment)
    throw new Error("Esta orden ya tiene un cobro registrado");

  const created = await db.orm.public.Payment.create({
    serviceId: data.serviceId,
    technicianId: data.technicianId,
    method: data.method,
    amountPaid: data.amountPaid.toString(),
    debtAmount: (data.debtAmount ?? 0).toString(),
  });

  await logActivity(
    data.serviceId,
    session.id,
    ACTIONS.PAYMENT_CREATED,
    "Cobro registrado",
    {
      amountPaid: data.amountPaid,
      method: data.method,
      debtAmount: data.debtAmount ?? 0,
    },
  );

  return applyFullInclude(db.orm.public.Payment).first({ id: created.id }) as unknown as Promise<Payment>;
}

/**
 * Actualiza un cobro.
 * Solo el Administrador puede modificar cobros ya registrados.
 */
export async function updatePayment(
  id: string,
  data: UpdatePaymentInput,
  session: SessionUser,
): Promise<Payment> {
  if (session.role !== "ADMIN")
    throw new Error("Solo un Administrador puede modificar cobros");

  const existing = await db.orm.public.Payment.first({ id });
  if (!existing) throw new Error("Cobro no encontrado");

  const updateData: any = {};
  if (data.method) updateData.method = data.method;
  if (data.amountPaid !== undefined) updateData.amountPaid = data.amountPaid.toString();
  if (data.debtAmount !== undefined) updateData.debtAmount = data.debtAmount.toString();

  await db.orm.public.Payment.where({ id }).update(updateData);

  const updated = await applyFullInclude(db.orm.public.Payment).first({ id });

  await logActivity(
    existing.serviceId,
    session.id,
    ACTIONS.PAYMENT_UPDATED,
    "Cobro actualizado",
    { amountPaid: updated.amountPaid, debtAmount: updated.debtAmount },
  );

  return updated as unknown as Payment;
}
