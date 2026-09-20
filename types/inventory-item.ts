import type { FieldOutputTypes } from "@/generated/prisma8/contract";
import type { Company } from "./company";
import type { ServicePart } from "./service-part";

// ─── Tipos base ───────────────────────────────────────────────────────────────

export type InventoryItemRow = FieldOutputTypes["public"]["InventoryItem"];

// ─── Tipo con relaciones ──────────────────────────────────────────────────────

export type InventoryItem = InventoryItemRow & {
  company?: Company | null;
  serviceParts?: ServicePart[];
};
