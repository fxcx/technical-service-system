import type { FieldOutputTypes } from "@/generated/prisma8/contract";
import type { Settlement } from "./settlement";
import type { Service } from "./service";
import type { Company } from "./company";

// ─── Tipos base ───────────────────────────────────────────────────────────────

export type SettlementPartRow = FieldOutputTypes["public"]["SettlementPart"];

// ─── Tipo con relaciones ──────────────────────────────────────────────────────

export type SettlementPart = SettlementPartRow & {
  settlement?: Settlement | null;
  service?: Service | null;
  company?: Company | null;
};
