/**
 * InventoryItem Service — TechService
 * Documentación: .docs/modulos/Inventario.md, .docs/reglas-negocio.md
 *
 * Catálogo de repuestos perteneciente a cada empresa.
 * Al importar desde Google Sheets se calculan costPrice y sellPrice.
 * Cuando un InventoryItem se usa en un ServicePart se hace snapshot de sus precios.
 */
import { prisma } from "@/lib/prisma";
import type { InventoryItem, InventoryItemFilters, SessionUser } from "@/types";
import type { z } from "zod";
import type {
    createInventoryItemSchema,
    updateInventoryItemSchema,
} from "@/lib/validations";

export type CreateInventoryItemInput = z.infer<typeof createInventoryItemSchema>;
export type UpdateInventoryItemInput = z.infer<typeof updateInventoryItemSchema>;

export async function listInventoryItems(
    filters: InventoryItemFilters,
): Promise<InventoryItem[]> {
    const where: Record<string, unknown> = {};

    if (filters.companyId) where.companyId = filters.companyId;
    if (filters.isActive !== undefined) where.isActive = filters.isActive;
    if (filters.search) {
        where.OR = [
            { name: { contains: filters.search, mode: "insensitive" } },
            { code: { contains: filters.search, mode: "insensitive" } },
        ];
    }

    return prisma.inventoryItem.findMany({
        where,
        include: { company: true },
        orderBy: { name: "asc" },
    }) as unknown as InventoryItem[];
}

export async function getInventoryItemById(
    id: string,
): Promise<InventoryItem | null> {
    return prisma.inventoryItem.findUnique({
        where: { id },
        include: { company: true },
    }) as unknown as InventoryItem | null;
}

export async function createInventoryItem(
    data: CreateInventoryItemInput,
    session: SessionUser,
): Promise<InventoryItem> {
    if (session.role !== "ADMIN")
        throw new Error("Solo un Administrador puede crear ítems de inventario");

    return prisma.inventoryItem.create({
        data: {
            companyId: data.companyId,
            code: data.code,
            name: data.name,
            unit: data.unit ?? undefined,
            stock: data.stock ?? 0,
            costInitList: data.costInitList,
            costPrice: data.costPrice,
            sellPrice: data.sellPrice,
            techPrice: data.techPrice,
            marginPercent: data.marginPercent ?? 0,
        },
        include: { company: true },
    }) as unknown as InventoryItem;
}

export async function updateInventoryItem(
    id: string,
    data: UpdateInventoryItemInput,
    session: SessionUser,
): Promise<InventoryItem> {
    if (session.role !== "ADMIN")
        throw new Error(
            "Solo un Administrador puede modificar ítems de inventario",
        );

    const existing = await prisma.inventoryItem.findUnique({ where: { id } });
    if (!existing) throw new Error("Ítem de inventario no encontrado");

    return prisma.inventoryItem.update({
        where: { id },
        data: {
            ...(data.name && { name: data.name }),
            ...(data.code && { code: data.code }),
            ...(data.unit !== undefined && { unit: data.unit }),
            ...(data.stock !== undefined && { stock: data.stock }),
            ...(data.costInitList !== undefined && {
                costInitList: data.costInitList,
            }),
            ...(data.costPrice !== undefined && { costPrice: data.costPrice }),
            ...(data.sellPrice !== undefined && { sellPrice: data.sellPrice }),
            ...(data.techPrice !== undefined && { techPrice: data.techPrice }),
            ...(data.marginPercent !== undefined && {
                marginPercent: data.marginPercent,
            }),
            ...(data.isActive !== undefined && { isActive: data.isActive }),
        },
        include: { company: true },
    }) as unknown as InventoryItem;
}

/**
 * Soft delete: marca el ítem como inactivo.
 * Los ServicePart que ya lo usan conservan sus snapshots históricos.
 */
export async function deactivateInventoryItem(
    id: string,
    session: SessionUser,
): Promise<void> {
    if (session.role !== "ADMIN")
        throw new Error(
            "Solo un Administrador puede desactivar ítems de inventario",
        );

    const existing = await prisma.inventoryItem.findUnique({ where: { id } });
    if (!existing) throw new Error("Ítem de inventario no encontrado");

    await prisma.inventoryItem.update({
        where: { id },
        data: { isActive: false },
    });
}
