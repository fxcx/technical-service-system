import type { FieldOutputTypes } from "@/generated/prisma8/contract";

// ─── Tipos base ───────────────────────────────────────────────────────────────

export type UserRow = FieldOutputTypes["public"]["User"];

// ─── Enums ────────────────────────────────────────────────────────────────────

export type Role = UserRow["role"];

// ─── Tipo con relaciones ──────────────────────────────────────────────────────

export type User = UserRow;
