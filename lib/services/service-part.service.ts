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
import { prisma } from "@/lib/prisma";
import { logActivity, ACTIONS } from "./activity-log.service";
import type { ServicePart, SessionUser } from "@/types";
import type { z } from "zod";
import type {
    addServicePartSchema,
    updateServicePartSchema,
} from "@/lib/validations";

export type AddServicePartInput = z.infer<typeof addServicePartSchema>;
export type UpdateServicePartInput = z.infer<typeof updateServicePartSchema>;

const INCLUDE = {
    inventoryItem: {
        select: {
            id: true,
            name: true,
            code: true,
            unit: true,
            company: { select: { id: true, name: true } },
        },
    },
};

export async function listServiceParts(
    serviceId: string,
): Promise<ServicePart[]> {
    return prisma.servicePart.findMany({
        where: { serviceId },
        include: INCLUDE,
        orderBy: { createdAt: "asc" },
    }) as unknown as ServicePart[];
}

export async function addServicePart(
    serviceId: string,
    data: AddServicePartInput,
    session: SessionUser,
): Promise<ServicePart> {
    const service = await prisma.service.findUnique({ where: { id: serviceId } });
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
        const item = await prisma.inventoryItem.findUnique({
            where: { id: data.inventoryItemId },
        });
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

    const part = await prisma.servicePart.create({
        data: {
            serviceId,
            inventoryItemId: data.inventoryItemId ?? undefined,
            name,
            nota: data.nota ?? undefined,
            quantity,
            unitCost,
            totalCost,
            unitSalePrice,
            totalSalePrice,
        },
        include: INCLUDE,
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

    return part as unknown as ServicePart;
}

export async function updateServicePart(
    partId: string,
    data: UpdateServicePartInput,
    session: SessionUser,
): Promise<ServicePart> {
    const existing = await prisma.servicePart.findUnique({
        where: { id: partId },
        include: { service: true },
    });
    if (!existing) throw new Error("Repuesto no encontrado");

    if (
        session.role === "TECHNICIAN" &&
        existing.service?.technicianId !== session.id
    ) {
        throw new Error("Sin permisos para modificar este repuesto");
    }

    const qty = data.quantity ?? Number(existing.quantity);
    const unitCost = data.unitCost ?? Number(existing.unitCost);
    const unitSalePrice = data.unitSalePrice ?? Number(existing.unitSalePrice);

    const part = await prisma.servicePart.update({
        where: { id: partId },
        data: {
            ...(data.name && { name: data.name }),
            ...(data.nota !== undefined && { nota: data.nota }),
            quantity: qty,
            unitCost,
            totalCost: unitCost * qty,
            unitSalePrice,
            totalSalePrice: unitSalePrice * qty,
        },
        include: INCLUDE,
    });

    return part as unknown as ServicePart;
}

export async function removeServicePart(
    partId: string,
    session: SessionUser,
): Promise<void> {
    const existing = await prisma.servicePart.findUnique({
        where: { id: partId },
        include: { service: true },
    });
    if (!existing) throw new Error("Repuesto no encontrado");

    if (
        session.role === "TECHNICIAN" &&
        existing.service?.technicianId !== session.id
    ) {
        throw new Error("Sin permisos para eliminar este repuesto");
    }

    await prisma.servicePart.delete({ where: { id: partId } });

    await logActivity(
        existing.serviceId,
        session.id,
        ACTIONS.PART_REMOVED,
        `Repuesto eliminado: ${existing.name}`,
    );
}
