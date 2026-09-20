import type { FieldOutputTypes } from "@/generated/prisma8/contract";
import type { Service } from "./service";
import type { User } from "./user";
import type { Settlement } from "./settlement";
import type { SettlementItem } from "./settlement-item";

// ─── Tipos base ───────────────────────────────────────────────────────────────

export type PaymentRow = FieldOutputTypes["public"]["Payment"];

// ─── Enums ────────────────────────────────────────────────────────────────────

export type PaymentMethod = PaymentRow["method"];

// ─── Tipo con relaciones ──────────────────────────────────────────────────────

export type Payment = PaymentRow & {
  service?: Service | null;
  technician?: User | null;
  settlement?: Settlement | null;
  settlementItems?: SettlementItem[];
};
