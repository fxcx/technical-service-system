/**
 * ServicePart Service (Repuestos del Servicio) — TechService
 * Documentación: .docs/reglas-negocio.md
 *
 * Los repuestos pertenecen al SERVICIO, no al cobro.
 *
 * Al agregar un repuesto desde el inventario se hace un snapshot de:
 * - name, unitCost, unitSalePrice
 *
 * Esto garantiza que el historial no cambie aunque el InventoryItem
 * actualice sus precios en el futuro.
 */
import { db } from "@/lib/prisma";
import { logActivity, ACTIONS } from "./activity-log.service";
import type { ServicePart, SessionUser } from "@/types";
import type { z } from "zod";
import type {
    addServicePartSchema,
    updateServicePartSchema,
} from "@/lib/validations";

export type AddServicePartInput = z.infer<typeof addServicePartSchema>;
export type UpdateServicePartInput = z.infer<typeof updateServicePartSchema>;

function applyInclude(query: any) {
    return query.include("inventoryItem", (i: any) =>
        i.select("id", "name", "code", "unit")
         .include("company", (c: any) => c.select("id", "name"))
    );
}

export async function listServiceParts(
    serviceId: string,
): Promise<ServicePart[]> {
    return applyInclude(db.orm.public.ServicePart.where({ serviceId }))
        .orderBy((p: any) => p.createdAt.asc())
        .all() as unknown as Promise<ServicePart[]>;
}

export async function addServicePart(
    serviceId: string,
    data: AddServicePartInput,
    session: SessionUser,
): Promise<ServicePart> {
    const service = await db.orm.public.Service.first({ id: serviceId });
    if (!service) throw new Error("Servicio no encontrado");

    // Técnico solo puede agregar repuestos a sus propias órdenes
    if (session.role === "TECHNICIAN" && service.technicianId !== session.id) {
        throw new Error("Sin permisos para modificar este servicio");
    }

    let name = data.name;
    let unitCost = data.unitCost;
    let unitSalePrice = data.unitSalePrice;

    // Si se provee inventoryItemId, usar snapshot de precios del ítem
    if (data.inventoryItemId) {
        const item = await db.orm.public.InventoryItem.first({ id: data.inventoryItemId });
        if (!item) throw new Error("Ítem de inventario no encontrado");

        // Validar que el ítem pertenece a la misma empresa del servicio
        if (item.companyId !== service.companyId) {
            throw new Error(
                "El repuesto no pertenece a la empresa del servicio",
            );
        }

        // Snapshot: usar valores del ítem si no se sobrescriben manualmente
        name = data.name || String(item.name);
        unitCost = data.unitCost ?? Number(item.costPrice);
        unitSalePrice = data.unitSalePrice ?? Number(item.sellPrice);
    }

    const quantity = data.quantity;
    const totalCost = unitCost * quantity;
    const totalSalePrice = unitSalePrice * quantity;

    const created = await db.orm.public.ServicePart.create({
        serviceId,
        inventoryItemId: data.inventoryItemId ?? null,
        name,
        nota: data.nota ?? null,
        quantity: quantity.toString(),
        unitCost: unitCost.toString(),
        totalCost: totalCost.toString(),
        unitSalePrice: unitSalePrice.toString(),
        totalSalePrice: totalSalePrice.toString(),
    });

    await logActivity(
        serviceId,
        session.id,
        ACTIONS.PART_ADDED,
        `Repuesto agregado: ${name}`,
        {
            inventoryItemId: data.inventoryItemId,
            quantity,
            unitCost,
            totalCost,
        },
    );

    return applyInclude(db.orm.public.ServicePart).first({ id: created.id }) as unknown as Promise<ServicePart>;
}

export async function updateServicePart(
    partId: string,
    data: UpdateServicePartInput,
    session: SessionUser,
): Promise<ServicePart> {
    const existing = await db.orm.public.ServicePart.include("service", (s: any) => s).first({ id: partId });
    if (!existing) throw new Error("Repuesto no encontrado");

    if (
        session.role === "TECHNICIAN" &&
        (existing.service as any)?.technicianId !== session.id
    ) {
        throw new Error("Sin permisos para modificar este repuesto");
    }

    const qty = data.quantity ?? Number(existing.quantity);
    const unitCost = data.unitCost ?? Number(existing.unitCost);
    const unitSalePrice = data.unitSalePrice ?? Number(existing.unitSalePrice);

    const updateData: any = {
        quantity: qty.toString(),
        unitCost: unitCost.toString(),
        totalCost: (unitCost * qty).toString(),
        unitSalePrice: unitSalePrice.toString(),
        totalSalePrice: (unitSalePrice * qty).toString(),
    };

    if (data.name) updateData.name = data.name;
    if (data.nota !== undefined) updateData.nota = data.nota;

    await db.orm.public.ServicePart.where({ id: partId }).update(updateData);

    return applyInclude(db.orm.public.ServicePart).first({ id: partId }) as unknown as Promise<ServicePart>;
}

export async function removeServicePart(
    partId: string,
    session: SessionUser,
): Promise<void> {
    const existing = await db.orm.public.ServicePart.include("service", (s: any) => s).first({ id: partId });
    if (!existing) throw new Error("Repuesto no encontrado");

    if (
        session.role === "TECHNICIAN" &&
        (existing.service as any)?.technicianId !== session.id
    ) {
        throw new Error("Sin permisos para eliminar este repuesto");
    }

    await db.orm.public.ServicePart.where({ id: partId }).delete();

    await logActivity(
        existing.serviceId,
        session.id,
        ACTIONS.PART_REMOVED,
        `Repuesto eliminado: ${existing.name}`,
    );
}
