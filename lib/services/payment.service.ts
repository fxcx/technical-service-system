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
import { prisma } from "@/lib/prisma";
import { logActivity, ACTIONS } from "./activity-log.service";
import type { Payment, PaymentFilters, SessionUser } from "@/types";
import type { z } from "zod";
import type {
  createPaymentSchema,
  updatePaymentSchema,
} from "@/lib/validations";

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>;

const USER_SELECT = {
  id: true,
  name: true,
  email: true,
  phone: true,
  role: true,
  isActive: true,
  avatar: true,
  createdAt: true,
  updatedAt: true,
  passwordHash: false,
} as const;

const FULL_INCLUDE = {
  service: {
    include: {
      client: true,
      company: true,
      category: true,
    },
  },
  technician: { select: USER_SELECT },
};

export async function listPayments(
  filters: PaymentFilters,
  session: SessionUser,
): Promise<Payment[]> {
  const where: Record<string, unknown> = {};

  // Técnicos solo ven sus propios cobros
  if (session.role === "TECHNICIAN") {
    where.technicianId = session.id;
  } else {
    if (filters.technicianId) where.technicianId = filters.technicianId;
  }

  if (filters.dateFrom || filters.dateTo) {
    where.createdAt = {
      ...(filters.dateFrom ? { gte: new Date(filters.dateFrom) } : {}),
      ...(filters.dateTo ? { lte: new Date(filters.dateTo) } : {}),
    };
  }

  return prisma.payment.findMany({
    where,
    include: FULL_INCLUDE,
    orderBy: { createdAt: "desc" },
  }) as unknown as Payment[];
}

export async function getPaymentById(
  id: string,
  session: SessionUser,
): Promise<Payment | null> {
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: FULL_INCLUDE,
  });

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
  return prisma.payment.findUnique({
    where: { serviceId },
    include: FULL_INCLUDE,
  }) as unknown as Payment | null;
}

export async function createPayment(
  data: CreatePaymentInput,
  session: SessionUser,
): Promise<Payment> {
  const service = await prisma.service.findUnique({
    where: { id: data.serviceId },
  });
  if (!service) throw new Error("Orden no encontrada");

  // Técnico solo puede cobrar sus propias órdenes
  if (session.role === "TECHNICIAN" && service.technicianId !== session.id) {
    throw new Error(
      "Sin permisos: solo podés registrar cobros de tus propias órdenes",
    );
  }

  // Verificar cobro duplicado
  const existingPayment = await prisma.payment.findUnique({
    where: { serviceId: data.serviceId },
  });
  if (existingPayment)
    throw new Error("Esta orden ya tiene un cobro registrado");

  const payment = await prisma.payment.create({
    data: {
      serviceId: data.serviceId,
      technicianId: data.technicianId,
      method: data.method,
      amountPaid: data.amountPaid,
      debtAmount: data.debtAmount ?? 0,
    },
    include: FULL_INCLUDE,
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

  return payment as unknown as Payment;
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

  const existing = await prisma.payment.findUnique({ where: { id } });
  if (!existing) throw new Error("Cobro no encontrado");

  const updated = await prisma.payment.update({
    where: { id },
    data: {
      ...(data.method && { method: data.method }),
      ...(data.amountPaid !== undefined && { amountPaid: data.amountPaid }),
      ...(data.debtAmount !== undefined && { debtAmount: data.debtAmount }),
    },
    include: FULL_INCLUDE,
  });

  await logActivity(
    existing.serviceId,
    session.id,
    ACTIONS.PAYMENT_UPDATED,
    "Cobro actualizado",
    { amountPaid: updated.amountPaid, debtAmount: updated.debtAmount },
  );

  return updated as unknown as Payment;
}
