import type { FieldOutputTypes } from "@/generated/prisma8/contract";
import type { Settlement } from "./settlement";
import type { Service } from "./service";
import type { Payment } from "./payment";

// ─── Tipos base ───────────────────────────────────────────────────────────────

export type SettlementItemRow = FieldOutputTypes["public"]["SettlementItem"];

// ─── Tipo con relaciones ──────────────────────────────────────────────────────

export type SettlementItem = SettlementItemRow & {
  settlement?: Settlement | null;
  service?: Service | null;
  payment?: Payment | null;
};
