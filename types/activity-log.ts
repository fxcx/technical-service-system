import type { FieldOutputTypes } from "@/generated/prisma8/contract";
import type { Service } from "./service";
import type { User } from "./user";

// ─── Tipos base ───────────────────────────────────────────────────────────────

export type ActivityLogRow = FieldOutputTypes["public"]["ActivityLog"];

// ─── Tipo con relaciones ──────────────────────────────────────────────────────

export type ActivityLog = ActivityLogRow & {
  service?: Service | null;
  user?: User | null;
};
