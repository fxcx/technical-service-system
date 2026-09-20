/**
 * Client Service — TechService
 * Documentación: docs/reglas-negocio.md, docs/api.md
 */
import { db } from "@/lib/prisma";
import type { Client } from "@/types";
import type { z } from "zod";
import type { createClientSchema, updateClientSchema } from "@/lib/validations";

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;

export async function listClients(): Promise<Client[]> {
  return db.orm.public.Client
    .orderBy(c => c.name.asc())
    .all() as unknown as Promise<Client[]>;
}

export async function getClientById(id: string): Promise<Client | null> {
  return db.orm.public.Client
    .include("services", s => s.select("id", "status", "scheduledDate").orderBy(x => x.scheduledDate.desc()).limit(5))
    .first({ id }) as unknown as Promise<Client | null>;
}

export async function createClient(data: CreateClientInput): Promise<Client> {
  return db.orm.public.Client.create({
    name: data.name,
    email: data.email || null,
    phone: data.phone,
    address: data.address,
    locality: data.locality,
  }) as unknown as Promise<Client>;
}

export async function updateClient(
  id: string,
  data: UpdateClientInput,
): Promise<Client> {
  const existing = await db.orm.public.Client.first({ id });
  if (!existing) throw new Error("Cliente no encontrado");

  const updateData: any = {};
  if (data.name) updateData.name = data.name;
  if (data.email !== undefined) updateData.email = data.email || null;
  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.address !== undefined) updateData.address = data.address;
  if (data.locality !== undefined) updateData.locality = data.locality;

  const updated = await db.orm.public.Client
    .where({ id })
    .update(updateData);

  return updated as unknown as Client;
}

/**
 * Elimina un cliente solamente si no tiene servicios asociados.
 * Los clientes con historial no pueden eliminarse (docs/reglas-negocio.md).
 */
export async function removeClient(id: string): Promise<void> {
  const existing = await db.orm.public.Client
    .include("services", s => s.count())
    .first({ id });

  if (!existing) throw new Error("Cliente no encontrado");

  if (existing.services > 0) {
    throw new Error(
      "No se puede eliminar el cliente porque tiene servicios asociados. El historial debe preservarse.",
    );
  }

  await db.orm.public.Client.where({ id }).delete();
}
