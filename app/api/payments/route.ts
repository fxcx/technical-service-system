import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { PaymentMethod, PaymentType } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "No autenticado" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const technicianId = searchParams.get("technicianId");

    const where: any = {};

    if (technicianId) where.technicianId = technicianId;

    if (session.role === "TECHNICIAN") {
      where.technicianId = session.id;
    }

    const payments = await prisma.payment.findMany({
      where,
      include: {
        service: true,
        technician: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: payments });
  } catch (error) {
    console.error("Payments fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Error interno" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "No autenticado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { serviceId, amount, debtAmount, hasDebt, method, technicianId } =
      body as {
        serviceId: string;
        amount: number;
        debtAmount?: number;
        hasDebt?: boolean;
        method: PaymentMethod;
        technicianId: string;
      };

    if (!serviceId || amount === undefined || !method || !technicianId) {
      return NextResponse.json(
        { success: false, error: "Datos incompletos" },
        { status: 400 }
      );
    }

    // Verify service exists - only select fields we need for validation
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      select: {
        id: true,
        technicianId: true,
      },
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Servicio no encontrado" },
        { status: 404 }
      );
    }

    // Technicians can only register payments for their own services
    if (session.role === "TECHNICIAN" && service.technicianId !== session.id) {
      return NextResponse.json(
        { success: false, error: "Sin permisos" },
        { status: 403 }
      );
    }

    const payment = await prisma.payment.create({
      data: {
        serviceId,
        amountPaid: amount,
        debtAmount: debtAmount || 0,
        hasDebt: hasDebt || false,
        method,
        technicianId,
      },
    });

    return NextResponse.json({ success: true, data: payment });
  } catch (error) {
    console.error("Payment create error:", error);
    return NextResponse.json(
      { success: false, error: "Error interno" },
      { status: 500 }
    );
  }
}
