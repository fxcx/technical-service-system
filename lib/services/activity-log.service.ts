/**
 * ActivityLog Service — TechService
 * Registra el historial de acciones sobre Órdenes de Trabajo.
 * Documentación: docs/reglas-negocio.md, docs/ordenes.md
 */
import { db } from "@/lib/prisma";
import type { ActivityLog } from "@/types";

export const ACTIONS = {
  // Servicio
  SERVICE_CREATED: "SERVICE_CREATED",
  SERVICE_UPDATED: "SERVICE_UPDATED",
  SERVICE_STATUS_CHANGED: "SERVICE_STATUS_CHANGED",
  SERVICE_TECHNICIAN_ASSIGNED: "SERVICE_TECHNICIAN_ASSIGNED",
  SERVICE_CLOSED: "SERVICE_CLOSED",
  SERVICE_CANCELLED: "SERVICE_CANCELLED",
  // Cobro
  PAYMENT_CREATED: "PAYMENT_CREATED",
  PAYMENT_UPDATED: "PAYMENT_UPDATED",
  // Repuestos
  PART_ADDED: "PART_ADDED",
  PART_REMOVED: "PART_REMOVED",
  // Presupuesto
  ESTIMATE_SENT: "ESTIMATE_SENT",
  ESTIMATE_FINALIZED: "ESTIMATE_FINALIZED",
  // WhatsApp
  WHATSAPP_COPIED: "WHATSAPP_COPIED",
  WHATSAPP_OPENED: "WHATSAPP_OPENED",
} as const;

export type ActionType = (typeof ACTIONS)[keyof typeof ACTIONS];

/**
 * Registra una acción en el historial de una orden.
 * Nunca lanza error — si falla, lo ignora para no bloquear el flujo principal.
 */
export async function logActivity(
  serviceId: string,
  userId: string,
  action: ActionType,
  description: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
  try {
    await db.orm.public.ActivityLog.create({
      serviceId,
      userId,
      action,
      description,
      metadata: metadata ? (metadata as any) : null,
    });
  } catch (err) {
    console.error("[ActivityLog] Error registrando historial:", err);
  }
}

/**
 * Obtiene el historial cronológico de una orden.
 */
export async function getServiceHistory(
  serviceId: string,
): Promise<ActivityLog[]> {
  return db.orm.public.ActivityLog
    .where({ serviceId })
    .include("user", u => u)
    .orderBy(log => log.createdAt.asc())
    .all() as unknown as Promise<ActivityLog[]>;
}
