import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { ServiceStatus } from "@/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "No autenticado" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { status, completedPhotoUrl } = body as {
      status: ServiceStatus;
      completedPhotoUrl?: string;
    };

    if (!status) {
      return NextResponse.json(
        { success: false, error: "Estado requerido" },
        { status: 400 },
      );
    }

    const service = await prisma.service.findUnique({
      where: { id },
    });
    if (!service) {
      return NextResponse.json(
        { success: false, error: "Servicio no encontrado" },
        { status: 404 },
      );
    }

    // Technicians can only update their own services
    if (session.role === "TECHNICIAN" && service.technicianId !== session.id) {
      return NextResponse.json(
        { success: false, error: "Sin permisos" },
        { status: 403 },
      );
    }

    const updateData: any = { status };
    if (status === "COMPLETED") {
      updateData.completedAt = new Date();
      if (completedPhotoUrl) {
        updateData.completedPhotoUrl = completedPhotoUrl;
      }
    }

    const updated = await prisma.service.update({
      where: { id },
      data: updateData,
      include: {
        technician: true,
        client: true,
        createdBy: true,
        payment: true,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json(
      { success: false, error: "Error interno" },
      { status: 500 },
    );
  }
}
