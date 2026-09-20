import type { FieldOutputTypes } from "@/generated/prisma8/contract";
import type { Service } from "./service";

// ─── Tipos base ───────────────────────────────────────────────────────────────

export type ServiceCategoryRow = FieldOutputTypes["public"]["ServiceCategory"];

// ─── Tipo con relaciones ──────────────────────────────────────────────────────

export type ServiceCategory = ServiceCategoryRow & {
  services?: Service[];
};
