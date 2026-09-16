/**
 * Company Service — TechService
 * Documentación: .docs/reglas-negocio.md
 *
 * Empresas para las cuales los técnicos prestan servicio.
 * Cada empresa posee su propio inventario de repuestos.
 */
import { prisma } from "@/lib/prisma";
import type { Company, SessionUser } from "@/types";
import type { z } from "zod";
import type {
    createCompanySchema,
    updateCompanySchema,
} from "@/lib/validations";

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;

const FULL_INCLUDE = {
    inventoryItems: false,
    services: false,
    settlements: false,
};

export async function listCompanies(): Promise<Company[]> {
    return prisma.company.findMany({
        orderBy: { name: "asc" },
    }) as unknown as Company[];
}

export async function listActiveCompanies(): Promise<Company[]> {
    return prisma.company.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
    }) as unknown as Company[];
}

export async function getCompanyById(id: string): Promise<Company | null> {
    return prisma.company.findUnique({
        where: { id },
    }) as unknown as Company | null;
}

export async function createCompany(
    data: CreateCompanyInput,
    session: SessionUser,
): Promise<Company> {
    if (session.role !== "ADMIN")
        throw new Error("Solo un Administrador puede crear empresas");

    return prisma.company.create({
        data: {
            name: data.name,
            logo: data.logo ?? undefined,
            costMarkupPercent: data.costMarkupPercent ?? 0,
            defaultMarginPercent: data.defaultMarginPercent ?? 0,
            isActive: true,
        },
    }) as unknown as Company;
}

export async function updateCompany(
    id: string,
    data: UpdateCompanyInput,
    session: SessionUser,
): Promise<Company> {
    if (session.role !== "ADMIN")
        throw new Error("Solo un Administrador puede modificar empresas");

    const existing = await prisma.company.findUnique({ where: { id } });
    if (!existing) throw new Error("Empresa no encontrada");

    return prisma.company.update({
        where: { id },
        data: {
            ...(data.name && { name: data.name }),
            ...(data.logo !== undefined && { logo: data.logo }),
            ...(data.costMarkupPercent !== undefined && {
                costMarkupPercent: data.costMarkupPercent,
            }),
            ...(data.defaultMarginPercent !== undefined && {
                defaultMarginPercent: data.defaultMarginPercent,
            }),
            ...(data.isActive !== undefined && { isActive: data.isActive }),
        },
    }) as unknown as Company;
}
