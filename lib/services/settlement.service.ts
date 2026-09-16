/**
 * Settlement Service (Rendiciones) — TechService
 * Documentación: .docs/modulos/paymentsRendition.md, .docs/reglas-negocio.md
 *
 * Reglas clave:
 * - Período libre: el admin define startDate y endDate por cada rendición.
 * - Comisión variable: se provee al generar (no se hereda del técnico).
 * - Los repuestos se calculan desde ServicePart de cada servicio del período.
 * - Solo el Administrador puede generar y liquidar rendiciones.
 * - Una rendición PAID no puede modificarse.
 *
 * Cálculo:
 *   totalCollected    = suma amountPaid de todos los cobros del período
 *   totalPartsCost    = suma totalCost de todos los ServiceParts de eses servicios
 *   commissionBase    = totalCollected - totalPartsCost
 *   techCommission    = commissionBase × commissionRate
 *   compCommission    = commissionBase × (1 - commissionRate)
 */
import { prisma } from "@/lib/prisma";
import type { Settlement, SettlementFilters, SessionUser } from "@/types";
import type { z } from "zod";
import type { generateSettlementSchema } from "@/lib/validations";

export type GenerateSettlementInput = z.infer<typeof generateSettlementSchema>;

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
  technician: { select: USER_SELECT },
  liquidatedBy: { select: USER_SELECT },
  company: { select: { id: true, name: true } },
  items: {
    include: {
      payment: {
        include: {
          service: {
            include: { client: true, category: true },
          },
        },
      },
      parts: true,
    },
    orderBy: { createdAt: "asc" as const },
  },
};

export async function listSettlements(
  filters: SettlementFilters,
  session: SessionUser,
): Promise<Settlement[]> {
  const where: Record<string, unknown> = {};

  // Técnico solo ve sus propias rendiciones
  if (session.role === "TECHNICIAN") {
    where.technicianId = session.id;
  } else {
    if (filters.technicianId) where.technicianId = filters.technicianId;
    if (filters.companyId) where.companyId = filters.companyId;
  }

  if (filters.status) where.status = filters.status;

  if (filters.dateFrom || filters.dateTo) {
    where.startDate = {};
    if (filters.dateFrom)
      (where.startDate as Record<string, unknown>).gte = new Date(
        filters.dateFrom,
      );
    if (filters.dateTo)
      (where.startDate as Record<string, unknown>).lte = new Date(
        filters.dateTo,
      );
  }

  return prisma.settlement.findMany({
    where,
    include: FULL_INCLUDE,
    orderBy: [{ startDate: "desc" }],
  }) as unknown as Settlement[];
}

export async function getSettlementById(
  id: string,
  session: SessionUser,
): Promise<Settlement | null> {
  const settlement = await prisma.settlement.findUnique({
    where: { id },
    include: FULL_INCLUDE,
  });

  if (!settlement) return null;

  if (
    session.role === "TECHNICIAN" &&
    settlement.technicianId !== session.id
  ) {
    throw new Error("Sin permisos para ver esta rendición");
  }

  return settlement as unknown as Settlement;
}

/**
 * Genera (o recalcula) la rendición de un técnico para un período.
 * Al generar se crean snapshots de SettlementItem (por cobro) y SettlementPart (por repuesto).
 */
export async function generateSettlement(
  data: GenerateSettlementInput,
  session: SessionUser,
): Promise<Settlement> {
  if (session.role !== "ADMIN")
    throw new Error("Solo un Administrador puede generar rendiciones");

  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);

  if (startDate >= endDate)
    throw new Error("La fecha de inicio debe ser anterior a la fecha de fin");

  const technician = await prisma.user.findUnique({
    where: { id: data.technicianId },
    select: { id: true, name: true, isActive: true },
  });
  if (!technician) throw new Error("Técnico no encontrado");
  if (!technician.isActive) throw new Error("El técnico no está activo");

  const commissionRate = data.commissionRate;

  // Obtener pagos del técnico en el período no asignados a una rendición PAID
  const payments = await prisma.payment.findMany({
    where: {
      technicianId: data.technicianId,
      createdAt: { gte: startDate, lte: endDate },
      OR: [
        { settlementId: null },
        { settlement: { status: { not: "PAID" } } },
      ],
    },
    include: {
      service: {
        include: {
          parts: true,
          client: true,
          category: true,
        },
      },
    },
  });

  // Calcular totales
  const totalCollected = payments.reduce(
    (sum, p) => sum + Number(p.amountPaid),
    0,
  );

  const totalPartsCost = payments.reduce((sum, p) => {
    const partsCost = (p.service?.parts ?? []).reduce(
      (s, part) => s + Number(part.totalCost),
      0,
    );
    return sum + partsCost;
  }, 0);

  const commissionBase = totalCollected - totalPartsCost;
  const techCommission = commissionBase * commissionRate;
  const compCommission = commissionBase * (1 - commissionRate);

  const label =
    data.label ||
    `Rendición ${technician.name} — ${startDate.toLocaleDateString("es-AR")} al ${endDate.toLocaleDateString("es-AR")}`;

  // ¿Existe una rendición PENDING para este técnico en este período?
  const existing = await prisma.settlement.findFirst({
    where: {
      technicianId: data.technicianId,
      startDate,
      endDate,
      status: "PENDING",
    },
  });

  if (existing) {
    // Eliminar items y parts anteriores de la rendición
    await prisma.settlementPart.deleteMany({
      where: { item: { settlementId: existing.id } },
    });
    await prisma.settlementItem.deleteMany({
      where: { settlementId: existing.id },
    });

    // Desasignar pagos previos
    await prisma.payment.updateMany({
      where: { settlementId: existing.id },
      data: { settlementId: null },
    });

    // Actualizar rendición y volver a crear items
    await prisma.settlement.update({
      where: { id: existing.id },
      data: {
        commissionRate,
        label,
        companyId: data.companyId ?? null,
        servicesCount: payments.length,
        totalCollected,
        totalPartsCost,
        commissionBase,
        techCommission,
        compCommission,
        status: "PENDING",
      },
    });

    await createSettlementSnapshots(existing.id, payments);

    return prisma.settlement.findUnique({
      where: { id: existing.id },
      include: FULL_INCLUDE,
    }) as unknown as Settlement;
  }

  // Crear nueva rendición
  const settlement = await prisma.settlement.create({
    data: {
      technicianId: data.technicianId,
      companyId: data.companyId ?? null,
      startDate,
      endDate,
      label,
      commissionRate,
      servicesCount: payments.length,
      totalCollected,
      totalPartsCost,
      commissionBase,
      techCommission,
      compCommission,
      status: "PENDING",
    },
  });

  await createSettlementSnapshots(settlement.id, payments);

  return prisma.settlement.findUnique({
    where: { id: settlement.id },
    include: FULL_INCLUDE,
  }) as unknown as Settlement;
}

/**
 * Crea los snapshots de SettlementItem y SettlementPart para una rendición.
 * Cada item es una foto del cobro; cada part es una foto del repuesto.
 */
async function createSettlementSnapshots(
  settlementId: string,
  payments: Array<{
    id: string;
    serviceId: string;
    amountPaid: unknown;
    debtAmount: unknown;
    method: string;
    service?: {
      parts?: Array<{
        id: string;
        name: string;
        quantity: unknown;
        unitCost: unknown;
        totalCost: unknown;
        unitSalePrice: unknown;
        totalSalePrice: unknown;
        inventoryItemId?: string | null;
        nota?: string | null;
      }>;
      client?: { id: string; phone?: string | null; name?: string | null } | null;
    } | null;
  }>,
) {
  for (const payment of payments) {
    // Vincular cobro a la rendición
    await prisma.payment.update({
      where: { id: payment.id },
      data: { settlementId },
    });

    const parts = payment.service?.parts ?? [];
    const partsCost = parts.reduce(
      (s, p) => s + Number(p.totalCost),
      0,
    );

    // Snapshot del cobro
    const item = await prisma.settlementItem.create({
      data: {
        settlementId,
        paymentId: payment.id,
        serviceId: payment.serviceId,
        amountPaid: Number(payment.amountPaid),
        debtAmount: Number(payment.debtAmount ?? 0),
        method: payment.method,
        partsCost,
      },
    });

    // Snapshots de repuestos
    for (const part of parts) {
      await prisma.settlementPart.create({
        data: {
          itemId: item.id,
          inventoryItemId: part.inventoryItemId ?? undefined,
          name: part.name,
          nota: part.nota ?? undefined,
          quantity: Number(part.quantity),
          unitCost: Number(part.unitCost),
          totalCost: Number(part.totalCost),
          unitSalePrice: Number(part.unitSalePrice),
          totalSalePrice: Number(part.totalSalePrice),
        },
      });
    }
  }
}

/**
 * Liquida (cierra) una rendición.
 * Una vez liquidada, no puede modificarse.
 */
export async function liquidateSettlement(
  id: string,
  session: SessionUser,
): Promise<Settlement> {
  if (session.role !== "ADMIN")
    throw new Error("Solo un Administrador puede liquidar rendiciones");

  const settlement = await prisma.settlement.findUnique({ where: { id } });
  if (!settlement) throw new Error("Rendición no encontrada");
  if (settlement.status === "PAID")
    throw new Error("Esta rendición ya fue liquidada");

  const updated = await prisma.settlement.update({
    where: { id },
    data: {
      status: "PAID",
      liquidatedById: session.id,
      liquidatedAt: new Date(),
    },
    include: FULL_INCLUDE,
  });

  return updated as unknown as Settlement;
}
