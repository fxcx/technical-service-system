import type { FieldOutputTypes } from "@/generated/prisma8/contract";
import type { Company } from "./company";
import type { Client } from "./client";
import type { ServiceCategory } from "./service-category";
import type { User } from "./user";
import type { Payment } from "./payment";
import type { Estimate } from "./estimate";
import type { ServicePart } from "./service-part";
import type { SettlementItem } from "./settlement-item";
import type { SettlementPart } from "./settlement-part";
import type { ActivityLog } from "./activity-log";

// ─── Tipos base ───────────────────────────────────────────────────────────────

export type ServiceRow = FieldOutputTypes["public"]["Service"];

// ─── Enums ────────────────────────────────────────────────────────────────────

export type ServiceStatus = ServiceRow["status"];

// ─── Tipo con relaciones ──────────────────────────────────────────────────────

export type Service = ServiceRow & {
  company?: Company | null;
  client?: Client | null;
  category?: ServiceCategory | null;
  technician?: User | null;
  createdBy?: User | null;
  closedBy?: User | null;
  payment?: Payment | null;
  estimate?: Estimate | null;
  parts?: ServicePart[];
  settlementItems?: SettlementItem[];
  settlementParts?: SettlementPart[];
  activityLogs?: ActivityLog[];
};
