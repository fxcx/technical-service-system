/**
 * Helpers de Comisión — TechService
 * Fórmula oficial: docs/reglas-negocio.md
 *
 * Monto Cobrado - Costo Repuestos = Monto Neto
 * Monto Neto × 50% = Comisión Técnico
 * Monto Neto × 50% = Comisión Empresa
 */

export interface CommissionResult {
  totalCollected: number;
  totalParts: number;
  netAmount: number;
  techCommission: number;
  compCommission: number;
}

/**
 * Calcula la comisión oficial dado un total cobrado y el costo de repuestos.
 * Siempre se calcula sobre el monto neto, nunca sobre el bruto.
 */
export function calculateCommission(
  totalCollected: number,
  totalParts: number,
): CommissionResult {
  const net = Math.max(0, totalCollected - totalParts);
  const half = parseFloat((net * 0.5).toFixed(2));

  return {
    totalCollected,
    totalParts,
    netAmount: net,
    techCommission: half,
    compCommission: parseFloat((net - half).toFixed(2)), // avoids rounding drift
  };
}

/**
 * Suma una lista de pagos y calcula la comisión de la rendición.
 */
export function calculateSettlementTotals(
  payments: Array<{
    amountPaid: number | string;
    sparePartsCost: number | string;
  }>,
): CommissionResult {
  const totalCollected = payments.reduce(
    (acc, p) => acc + Number(p.amountPaid),
    0,
  );
  const totalParts = payments.reduce(
    (acc, p) => acc + Number(p.sparePartsCost),
    0,
  );
  return calculateCommission(
    parseFloat(totalCollected.toFixed(2)),
    parseFloat(totalParts.toFixed(2)),
  );
}
