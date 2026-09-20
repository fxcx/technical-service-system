import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import {
  updateTechnician,
  removeTechnician,
} from "@/lib/services/technician.service";
import { updateTechnicianSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await requireAuth();
    if (session.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Sin permisos" },
        { status: 403 },
      );
    }

    const { id } = await params;
    const body = await request.json();

    const parsed = updateTechnicianSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const technician = await updateTechnician(id, parsed.data);
    return NextResponse.json({ success: true, data: technician });
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

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await requireAuth();
    if (session.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Sin permisos" },
        { status: 403 },
      );
    }

    const { id } = await params;
    await removeTechnician(id);
    return NextResponse.json({ success: true, message: "Técnico eliminado" });
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
