import type { FieldOutputTypes } from "@/generated/prisma8/contract";
import type { Service } from "./service";
import type { InventoryItem } from "./inventory-item";
import type { Settlement } from "./settlement";

// ─── Tipos base ───────────────────────────────────────────────────────────────

export type CompanyRow = FieldOutputTypes["public"]["Company"];

// ─── Tipo con relaciones ──────────────────────────────────────────────────────

export type Company = CompanyRow & {
  services?: Service[];
  inventoryItems?: InventoryItem[];
  settlements?: Settlement[];
};
