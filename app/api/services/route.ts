import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "No autenticado" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const technicianId = searchParams.get("technicianId");
    const clientId = searchParams.get("clientId");
    const status = searchParams.get("status");

    const filters: {
      technicianId?: string;
      clientId?: string;
      status?: string;
    } = {};

    if (technicianId) filters.technicianId = technicianId;
    if (clientId) filters.clientId = clientId;
    if (status) filters.status = status;

    const where: any = {};
    if (technicianId) where.technicianId = technicianId;
    if (clientId) where.clientId = clientId;
    if (status) where.status = status as any;

    const services = await prisma.service.findMany({
      where,
      include: {
        technician: true,
        client: true,
        createdBy: true,
        payment: true,
      },
      orderBy: { scheduledDate: "desc" },
    });
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error("Services fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Error interno" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Sin permisos" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      clientId,
      technicianId,
      scheduledDate,
      scheduledTime,
      address,
      notes,
      expectedAmount,
      createdById,
    } = body;

    if (!title || !clientId || !scheduledDate || !scheduledTime) {
      return NextResponse.json(
        { success: false, error: "Datos incompletos" },
        { status: 400 },
      );
    }

    const service = await prisma.service.create({
      data: {
        title,
        description,
        clientId,
        technicianId: technicianId || undefined,
        scheduledDate: new Date(scheduledDate),
        scheduledTime,
        address,
        notes,
        expectedAmount: expectedAmount || null,
        createdById,
        status: "PENDING",
      },
      include: {
        technician: true,
        client: true,
        createdBy: true,
        payment: true,
      },
    });

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error("Service create error:", error);
    return NextResponse.json(
      { success: false, error: "Error interno" },
      { status: 500 },
    );
  }
}
