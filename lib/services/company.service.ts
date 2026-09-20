/**
 * Company Service — TechService
 * Documentación: .docs/reglas-negocio.md
 *
 * Empresas para las cuales los técnicos prestan servicio.
 * Cada empresa posee su propio inventario de repuestos.
 */
import { db } from "@/lib/prisma";
import type { Company, SessionUser } from "@/types";
import type { z } from "zod";
import type {
    createCompanySchema,
    updateCompanySchema,
} from "@/lib/validations";

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;

export async function listCompanies(): Promise<Company[]> {
    return db.orm.public.Company
        .orderBy(c => c.name.asc())
        .all() as unknown as Promise<Company[]>;
}

export async function listActiveCompanies(): Promise<Company[]> {
    return db.orm.public.Company
        .where({ isActive: true })
        .orderBy(c => c.name.asc())
        .all() as unknown as Promise<Company[]>;
}

export async function getCompanyById(id: string): Promise<Company | null> {
    return db.orm.public.Company.first({ id }) as unknown as Promise<Company | null>;
}

export async function createCompany(
    data: CreateCompanyInput,
    session: SessionUser,
): Promise<Company> {
    if (session.role !== "ADMIN")
        throw new Error("Solo un Administrador puede crear empresas");

    return db.orm.public.Company.create({
        name: data.name,
        logo: data.logo ?? null,
        costMarkupPercent: data.costMarkupPercent?.toString() ?? "0",
        defaultMarginPercent: data.defaultMarginPercent?.toString() ?? "0",
        isActive: true,
    }) as unknown as Promise<Company>;
}

export async function updateCompany(
    id: string,
    data: UpdateCompanyInput,
    session: SessionUser,
): Promise<Company> {
    if (session.role !== "ADMIN")
        throw new Error("Solo un Administrador puede modificar empresas");

    const existing = await db.orm.public.Company.first({ id });
    if (!existing) throw new Error("Empresa no encontrada");

    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.logo !== undefined) updateData.logo = data.logo;
    if (data.costMarkupPercent !== undefined) updateData.costMarkupPercent = data.costMarkupPercent.toString();
    if (data.defaultMarginPercent !== undefined) updateData.defaultMarginPercent = data.defaultMarginPercent.toString();
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    const updated = await db.orm.public.Company
        .where({ id })
        .update(updateData);
        
    return updated as unknown as Company;
}
