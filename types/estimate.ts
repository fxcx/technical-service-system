import type { FieldOutputTypes } from "@/generated/prisma8/contract";
import type { Service } from "./service";

// ─── Tipos base ───────────────────────────────────────────────────────────────

export type EstimateRow = FieldOutputTypes["public"]["Estimate"];

// ─── Enums ────────────────────────────────────────────────────────────────────

export type EstimateStatus = EstimateRow["status"];

// ─── Tipo con relaciones ──────────────────────────────────────────────────────

export type Estimate = EstimateRow & {
  service?: Service | null;
};
