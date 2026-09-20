import type { FieldOutputTypes } from "@/generated/prisma8/contract";
import type { User } from "./user";
import type { Company } from "./company";
import type { Payment } from "./payment";
import type { SettlementItem } from "./settlement-item";
import type { SettlementPart } from "./settlement-part";

// ─── Tipos base ───────────────────────────────────────────────────────────────

export type SettlementRow = FieldOutputTypes["public"]["Settlement"];

// ─── Enums ────────────────────────────────────────────────────────────────────

export type SettlementStatus = SettlementRow["status"];

// ─── Tipo con relaciones ──────────────────────────────────────────────────────

export type Settlement = SettlementRow & {
  technician?: User | null;
  liquidatedBy?: User | null;
  company?: Company | null;
  payments?: Payment[];
  items?: SettlementItem[];
  parts?: SettlementPart[];
};
