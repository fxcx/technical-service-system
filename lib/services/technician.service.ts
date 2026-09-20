/**
 * Technician Service — TechService
 * Documentación: docs/tecnicos.md, docs/decisiones.md (DEC-012)
 * El Técnico nunca administra información de otros técnicos.
 */
import { db } from "@/lib/prisma";
import { hash } from "bcrypt";
import type { User } from "@/types";
import type { z } from "zod";
import type {
  createTechnicianSchema,
  updateTechnicianSchema,
} from "@/lib/validations";

export type CreateTechnicianInput = z.infer<typeof createTechnicianSchema>;
export type UpdateTechnicianInput = z.infer<typeof updateTechnicianSchema>;

const SELECT_FIELDS = [
  "id",
  "name",
  "email",
  "phone",
  "role",
  "isActive",
  "avatar",
  "createdAt",
  "updatedAt",
] as const;

export async function listTechnicians(): Promise<Omit<User, "passwordHash">[]> {
  return db.orm.public.User
    .where({ role: "TECHNICIAN" })
    .select(...SELECT_FIELDS)
    .orderBy(u => u.name.asc())
    .all() as unknown as Promise<Omit<User, "passwordHash">[]>;
}

export async function listUsers(): Promise<Omit<User, "passwordHash">[]> {
  return db.orm.public.User
    .select(...SELECT_FIELDS)
    .orderBy(u => u.name.asc())
    .all() as unknown as Promise<Omit<User, "passwordHash">[]>;
}

export async function getTechnicianById(
  id: string,
): Promise<Omit<User, "passwordHash"> | null> {
  return db.orm.public.User
    .select(...SELECT_FIELDS)
    .first({ id }) as unknown as Promise<Omit<User, "passwordHash"> | null>;
}

export async function createTechnician(
  data: CreateTechnicianInput,
): Promise<Omit<User, "passwordHash">> {
  const existing = await db.orm.public.User.where({ email: data.email }).first();
  if (existing) throw new Error("El email ya está registrado");

  const passwordHash = await hash(data.password, 10);

  const created = await db.orm.public.User.create({
    name: data.name,
    email: data.email,
    passwordHash,
    phone: data.phone,
    role: "TECHNICIAN",
    isActive: true,
  });

  return db.orm.public.User
    .select(...SELECT_FIELDS)
    .first({ id: created.id }) as unknown as Promise<Omit<User, "passwordHash">>;
}

export async function updateTechnician(
  id: string,
  data: UpdateTechnicianInput,
): Promise<Omit<User, "passwordHash">> {
  const existing = await db.orm.public.User.first({ id });
  if (!existing) throw new Error("Técnico no encontrado");

  const updateData: Record<string, unknown> = {};
  if (data.name) updateData.name = data.name;
  if (data.email) updateData.email = data.email;
  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.isActive !== undefined) updateData.isActive = data.isActive;
  if (data.password) updateData.passwordHash = await hash(data.password, 10);

  await db.orm.public.User.where({ id }).update(updateData as any);

  return db.orm.public.User
    .select(...SELECT_FIELDS)
    .first({ id }) as unknown as Promise<Omit<User, "passwordHash">>;
}

/**
 * Realiza soft delete si el técnico tiene historial, hard delete si no.
 */
export async function removeTechnician(id: string): Promise<void> {
  const existing = await db.orm.public.User.first({ id });
  if (!existing) throw new Error("Técnico no encontrado");

  // NOTE: If Payment doesn't have technicianId, we will adjust this later when compiling
  const [servicesAgg, paymentsAgg] = await Promise.all([
    db.orm.public.Service.where({ technicianId: id }).aggregate(a => ({ c: a.count() })),
    db.orm.public.Payment.where({ technicianId: id }).aggregate(a => ({ c: a.count() })),
  ]);

  const servicesCount = servicesAgg.c;
  const paymentsCount = paymentsAgg.c;

  if (servicesCount > 0 || paymentsCount > 0) {
    await db.orm.public.User.where({ id }).update({ isActive: false });
  } else {
    await db.orm.public.User.where({ id }).delete();
  }
}
