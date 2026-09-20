import type { FieldOutputTypes } from "@/generated/prisma8/contract";
import type { Service } from "./service";
import type { InventoryItem } from "./inventory-item";

// ─── Tipos base ───────────────────────────────────────────────────────────────

export type ServicePartRow = FieldOutputTypes["public"]["ServicePart"];

// ─── Tipo con relaciones ──────────────────────────────────────────────────────

export type ServicePart = ServicePartRow & {
  service?: Service | null;
  inventoryItem?: InventoryItem | null;
};
