/**
 * InventoryItem Service — TechService
 * Documentación: .docs/modulos/Inventario.md, .docs/reglas-negocio.md
 *
 * Catálogo de repuestos perteneciente a cada empresa.
 * Al importar desde Google Sheets se calculan costPrice y sellPrice.
 * Cuando un InventoryItem se usa en un ServicePart se hace snapshot de sus precios.
 */
import { db } from "@/lib/prisma";
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
    let query: any = db.orm.public.InventoryItem;

    if (filters.companyId) {
        query = query.where({ companyId: filters.companyId });
    }
    if (filters.isActive !== undefined) {
        query = query.where({ isActive: filters.isActive });
    }
    
    let baseQuery = query.include("company", (c: any) => c);

    if (filters.search) {
        const s = `%${filters.search}%`;
        const q1 = await baseQuery.where((m: any) => m.name.ilike(s)).all();
        const q2 = await baseQuery.where((m: any) => m.code.ilike(s)).all();
        
        const merged = [...(q1 as any[]), ...(q2 as any[])];
        const unique = Array.from(new Map(merged.map(item => [item.id, item])).values());
        
        return unique.sort((a: any, b: any) => a.name.localeCompare(b.name)) as unknown as InventoryItem[];
    }

    return baseQuery
        .orderBy((c: any) => c.name.asc())
        .all() as unknown as Promise<InventoryItem[]>;
}

export async function getInventoryItemById(
    id: string,
): Promise<InventoryItem | null> {
    return db.orm.public.InventoryItem
        .include("company", (c: any) => c)
        .first({ id }) as unknown as Promise<InventoryItem | null>;
}

export async function createInventoryItem(
    data: CreateInventoryItemInput,
    session: SessionUser,
): Promise<InventoryItem> {
    if (session.role !== "ADMIN")
        throw new Error("Solo un Administrador puede crear ítems de inventario");

    const created = await db.orm.public.InventoryItem.create({
        companyId: data.companyId,
        code: data.code,
        name: data.name,
        unit: data.unit ?? null,
        stock: data.stock ?? 0,
        costInitList: data.costInitList.toString(),
        costPrice: data.costPrice.toString(),
        sellPrice: data.sellPrice.toString(),
        techPrice: data.techPrice.toString(),
        marginPercent: data.marginPercent?.toString() ?? "0",
        isActive: true,
    });
    
    return db.orm.public.InventoryItem
        .include("company", (c: any) => c)
        .first({ id: created.id }) as unknown as Promise<InventoryItem>;
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

    const existing = await db.orm.public.InventoryItem.first({ id });
    if (!existing) throw new Error("Ítem de inventario no encontrado");

    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.code) updateData.code = data.code;
    if (data.unit !== undefined) updateData.unit = data.unit;
    if (data.stock !== undefined) updateData.stock = data.stock;
    if (data.costInitList !== undefined) updateData.costInitList = data.costInitList.toString();
    if (data.costPrice !== undefined) updateData.costPrice = data.costPrice.toString();
    if (data.sellPrice !== undefined) updateData.sellPrice = data.sellPrice.toString();
    if (data.techPrice !== undefined) updateData.techPrice = data.techPrice.toString();
    if (data.marginPercent !== undefined) updateData.marginPercent = data.marginPercent.toString();
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    await db.orm.public.InventoryItem.where({ id }).update(updateData);

    return db.orm.public.InventoryItem
        .include("company", (c: any) => c)
        .first({ id }) as unknown as Promise<InventoryItem>;
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

    const existing = await db.orm.public.InventoryItem.first({ id });
    if (!existing) throw new Error("Ítem de inventario no encontrado");

    await db.orm.public.InventoryItem.where({ id }).update({ isActive: false });
}
