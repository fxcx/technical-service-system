import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import {
  getServiceById,
  updateService,
  cancelService,
} from "@/lib/services/service.service";
import { updateServiceSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await requireAuth();
    const { id } = await params;
    const service = await getServiceById(id, session);

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Orden no encontrada" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: service });
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

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await requireAuth();
    const { id } = await params;
    const body = await request.json();

    const parsed = updateServiceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const service = await updateService(id, parsed.data, session);
    return NextResponse.json({ success: true, data: service });
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

/**
 * DELETE → soft delete (cancela la orden).
 * Los servicios nunca se eliminan físicamente (docs/reglas-negocio.md).
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await requireAuth();
    const { id } = await params;
    const service = await cancelService(id, session);
    return NextResponse.json({ success: true, data: service });
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
