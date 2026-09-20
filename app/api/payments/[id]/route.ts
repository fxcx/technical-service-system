import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getPaymentById, updatePayment } from "@/lib/services/payment.service";
import { updatePaymentSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await requireAuth();
    const { id } = await params;
    const payment = await getPaymentById(id, session);

    if (!payment) {
      return NextResponse.json(
        { success: false, error: "Cobro no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: payment });
  } catch (error: any) {
    const status =
      error.message === "Unauthorized"
        ? 401
        : error.message?.includes("permisos")
          ? 403
          : 500;
    return NextResponse.json(
      { success: false, error: error.message ?? "Error interno" },
      { status },
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await requireAuth();
    const { id } = await params;
    const body = await request.json();

    const parsed = updatePaymentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const payment = await updatePayment(id, parsed.data, session);
    return NextResponse.json({ success: true, data: payment });
  } catch (error: any) {
    const status =
      error.message === "Unauthorized"
        ? 401
        : error.message?.includes("permisos")
          ? 403
          : error.message?.includes("no encontrad")
            ? 404
            : 500;
    return NextResponse.json(
      { success: false, error: error.message ?? "Error interno" },
      { status },
    );
  }
}
