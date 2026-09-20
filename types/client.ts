import type { FieldOutputTypes } from "@/generated/prisma8/contract";
import type { Service } from "./service";

// ─── Tipos base ───────────────────────────────────────────────────────────────

export type ClientRow = FieldOutputTypes["public"]["Client"];

// ─── Tipo con relaciones ──────────────────────────────────────────────────────

export type Client = ClientRow & {
  services?: Service[];
};
