import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { listPayments, createPayment } from "@/lib/services/payment.service";
import { createPaymentSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth();
    const { searchParams } = new URL(request.url);

    const payments = await listPayments(
      {
        technicianId: searchParams.get("technicianId") ?? undefined,
        dateFrom: searchParams.get("dateFrom") ?? undefined,
        dateTo: searchParams.get("dateTo") ?? undefined,
      },
      session,
    );

    return NextResponse.json({ success: true, data: payments });
  } catch (error: any) {
    const status = error.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json(
      { success: false, error: error.message ?? "Error interno" },
      { status },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await request.json();

    // Support legacy field name `amount` → `amountPaid`
    if (body.amount !== undefined && body.amountPaid === undefined) {
      body.amountPaid = body.amount;
    }

    const parsed = createPaymentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const payment = await createPayment(parsed.data, session);
    return NextResponse.json({ success: true, data: payment }, { status: 201 });
  } catch (error: any) {
    const status =
      error.message === "Unauthorized"
        ? 401
        : error.message?.includes("permisos")
          ? 403
          : error.message?.includes("no encontrad")
            ? 404
            : error.message?.includes("ya tiene un cobro")
              ? 409
              : 500;
    return NextResponse.json(
      { success: false, error: error.message ?? "Error interno" },
      { status },
    );
  }
}
