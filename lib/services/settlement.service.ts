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
 *   totalDebt         = suma debtAmount de todos los cobros del período
 *   totalPartsCost    = suma totalCost de todos los ServiceParts de esos servicios
 *   totalPartsSale    = suma totalSalePrice de todos los ServiceParts de esos servicios
 *   commissionBase    = totalCollected - totalPartsCost
 *   techCommission    = commissionBase × commissionRate
 *   compCommission    = commissionBase × (1 - commissionRate)
 */
import { db } from "@/lib/prisma";
import { toInstant, toDate, nowInstant } from "@/lib/utils";
import type { Settlement, SettlementFilters, SessionUser } from "@/types";
import type { z } from "zod";
import type { generateSettlementSchema } from "@/lib/validations";

export type GenerateSettlementInput = z.infer<typeof generateSettlementSchema>;

const USER_SELECT_FIELDS = [
  "id", "name", "email", "phone", "role", 
  "isActive", "avatar", "createdAt", "updatedAt"
] as const;

function applyFullInclude(query: any) {
  return query
    .include("technician", (t: any) => t.select(...USER_SELECT_FIELDS))
    .include("liquidatedBy", (l: any) => l.select(...USER_SELECT_FIELDS))
    .include("company", (c: any) => c.select("id", "name"))
    .include("payments", (p: any) => p
      .include("service", (s: any) => s
        .include("client", (c: any) => c)
        .include("category", (c: any) => c)
        .include("parts", (p2: any) => p2)
      )
      .orderBy((x: any) => x.createdAt.asc())
    )
    .include("items", (i: any) => i
      .include("service", (s: any) => s
        .include("client", (c: any) => c)
        .include("category", (c: any) => c)
      )
      .include("payment", (p2: any) => p2)
      .orderBy((x: any) => x.createdAt.asc())
    )
    .include("parts", (p: any) => p
      .include("service", (s: any) => s.select("id", "orderNumber"))
      .include("company", (c: any) => c.select("id", "name"))
      .orderBy((x: any) => x.createdAt.asc())
    );
}

export async function listSettlements(
  filters: SettlementFilters,
  session: SessionUser,
): Promise<Settlement[]> {
  let query: any = db.orm.public.Settlement;

  if (session.role === "TECHNICIAN") {
    query = query.where({ technicianId: session.id });
  } else {
    if (filters.technicianId) query = query.where({ technicianId: filters.technicianId });
    if (filters.companyId) query = query.where({ companyId: filters.companyId });
  }

  if (filters.status) query = query.where({ status: filters.status });

  if (filters.dateFrom) query = query.where((s: any) => s.startDate.gte(toInstant(filters.dateFrom!)));
  if (filters.dateTo) query = query.where((s: any) => s.startDate.lte(toInstant(filters.dateTo!)));

  return applyFullInclude(query)
    .orderBy((s: any) => s.startDate.desc())
    .all() as unknown as Promise<Settlement[]>;
}

export async function getSettlementById(
  id: string,
  session: SessionUser,
): Promise<Settlement | null> {
  const settlement = await applyFullInclude(db.orm.public.Settlement).first({ id });

  if (!settlement) return null;

  if (
    session.role === "TECHNICIAN" &&
    settlement.technicianId !== session.id
  ) {
    throw new Error("Sin permisos para ver esta rendición");
  }

  return settlement as unknown as Settlement;
}

export async function generateSettlement(
  data: GenerateSettlementInput,
  session: SessionUser,
): Promise<Settlement> {
  if (session.role !== "ADMIN")
    throw new Error("Solo un Administrador puede generar rendiciones");

  const startDateDate = new Date(data.startDate);
  const endDateDate = new Date(data.endDate);

  if (startDateDate >= endDateDate)
    throw new Error("La fecha de inicio debe ser anterior a la fecha de fin");

  const startDateInstant = toInstant(data.startDate);
  const endDateInstant = toInstant(data.endDate);

  const technician = await db.orm.public.User.select("id", "name", "isActive").first({ id: data.technicianId });
  if (!technician) throw new Error("Técnico no encontrado");
  if (!technician.isActive) throw new Error("El técnico no está activo");

  const commissionRate = data.commissionRate;

  const allPayments = await db.orm.public.Payment
    .where({ technicianId: data.technicianId })
    .include("service", (s: any) => s
      .include("parts", (p: any) => p)
      .include("client", (c: any) => c)
      .include("category", (c: any) => c)
    )
    .include("settlement", (s: any) => s.select("status"))
    .all();

  const payments = (allPayments as any[]).filter((p) => {
    const d = toDate(p.createdAt);
    if (d < startDateDate || d > endDateDate) return false;
    if (p.settlementId === null) return true;
    if (p.settlement && p.settlement.status !== "PAID") return true;
    return false;
  });

  const totalCollected = payments.reduce((sum, p) => sum + Number(p.amountPaid), 0);
  const totalDebt = payments.reduce((sum, p) => sum + Number(p.debtAmount), 0);

  const totalPartsCost = payments.reduce((sum, p) => {
    const partsCost = (p.service?.parts ?? []).reduce((s: number, part: any) => s + Number(part.totalCost), 0);
    return sum + partsCost;
  }, 0);

  const totalPartsSale = payments.reduce((sum, p) => {
    const partsSale = (p.service?.parts ?? []).reduce((s: number, part: any) => s + Number(part.totalSalePrice), 0);
    return sum + partsSale;
  }, 0);

  const commissionBase = totalCollected - totalPartsCost;
  const techCommission = commissionBase * commissionRate;
  const compCommission = commissionBase * (1 - commissionRate);

  const label =
    data.label ||
    `Rendición ${technician.name} — ${startDateDate.toLocaleDateString("es-AR")} al ${endDateDate.toLocaleDateString("es-AR")}`;

  const existing = await db.orm.public.Settlement.first({
    technicianId: data.technicianId,
    startDate: startDateInstant,
    endDate: endDateInstant,
    status: "PENDING",
  });

  if (existing) {
    await db.orm.public.SettlementPart.where({ settlementId: existing.id }).delete();
    await db.orm.public.SettlementItem.where({ settlementId: existing.id }).delete();
    await db.orm.public.Payment.where({ settlementId: existing.id }).update({ settlementId: null });

    await db.orm.public.Settlement.where({ id: existing.id }).update({
      commissionRate: commissionRate.toString(),
      label,
      companyId: data.companyId ?? null,
      servicesCount: payments.length,
      totalCollected: totalCollected.toString(),
      totalDebt: totalDebt.toString(),
      totalPartsCost: totalPartsCost.toString(),
      totalPartsSale: totalPartsSale.toString(),
      commissionBase: commissionBase.toString(),
      techCommission: techCommission.toString(),
      compCommission: compCommission.toString(),
      status: "PENDING",
    });

    await createSettlementSnapshots(existing.id, payments, commissionRate);

    return applyFullInclude(db.orm.public.Settlement).first({ id: existing.id }) as unknown as Promise<Settlement>;
  }

  const settlement = await db.orm.public.Settlement.create({
    technicianId: data.technicianId,
    companyId: data.companyId ?? null,
    startDate: startDateInstant,
    endDate: endDateInstant,
    label,
    commissionRate: commissionRate.toString(),
    servicesCount: payments.length,
    totalCollected: totalCollected.toString(),
    totalDebt: totalDebt.toString(),
    totalPartsCost: totalPartsCost.toString(),
    totalPartsSale: totalPartsSale.toString(),
    commissionBase: commissionBase.toString(),
    techCommission: techCommission.toString(),
    compCommission: compCommission.toString(),
    status: "PENDING",
  });

  await createSettlementSnapshots(settlement.id, payments, commissionRate);

  return applyFullInclude(db.orm.public.Settlement).first({ id: settlement.id }) as unknown as Promise<Settlement>;
}

async function createSettlementSnapshots(
  settlementId: string,
  payments: Array<any>,
  commissionRate: number,
) {
  for (const payment of payments) {
    await db.orm.public.Payment.where({ id: payment.id }).update({ settlementId });

    const parts = payment.service?.parts ?? [];
    const partsCost = parts.reduce((s: number, p: any) => s + Number(p.totalCost), 0);
    const partsSale = parts.reduce((s: number, p: any) => s + Number(p.totalSalePrice), 0);
    const collected = Number(payment.amountPaid);
    const debt = Number(payment.debtAmount ?? 0);
    const base = collected - partsCost;

    await db.orm.public.SettlementItem.create({
      settlementId,
      serviceId: payment.serviceId,
      paymentId: payment.id,
      serviceAmount: Number(payment.service?.finalAmount ?? 0).toString(),
      collectedAmount: collected.toString(),
      debtAmount: debt.toString(),
      partsCostAmount: partsCost.toString(),
      partsSaleAmount: partsSale.toString(),
      commissionBase: base.toString(),
      commissionRate: commissionRate.toString(),
      technicianAmount: (base * commissionRate).toString(),
      companyAmount: (base * (1 - commissionRate)).toString(),
    });

    for (const part of parts) {
      await db.orm.public.SettlementPart.create({
        settlementId,
        serviceId: part.serviceId,
        companyId: payment.service?.companyId ?? null,
        name: part.name,
        quantity: Number(part.quantity).toString(),
        unitCost: Number(part.unitCost).toString(),
        totalCost: Number(part.totalCost).toString(),
        unitSalePrice: Number(part.unitSalePrice).toString(),
        totalSalePrice: Number(part.totalSalePrice).toString(),
      });
    }
  }
}

export async function liquidateSettlement(
  id: string,
  session: SessionUser,
): Promise<Settlement> {
  if (session.role !== "ADMIN")
    throw new Error("Solo un Administrador puede liquidar rendiciones");

  const settlement = await db.orm.public.Settlement.first({ id });
  if (!settlement) throw new Error("Rendición no encontrada");
  if (settlement.status === "PAID")
    throw new Error("Esta rendición ya fue liquidada");

  await db.orm.public.Settlement.where({ id }).update({
    status: "PAID",
    liquidatedById: session.id,
    liquidatedAt: nowInstant(),
  });

  return applyFullInclude(db.orm.public.Settlement).first({ id }) as unknown as Promise<Settlement>;
}
