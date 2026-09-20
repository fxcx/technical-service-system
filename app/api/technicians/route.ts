import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import {
  listTechnicians,
  createTechnician,
} from "@/lib/services/technician.service";
import { createTechnicianSchema } from "@/lib/validations";

export async function GET() {
  try {
    await requireAuth();
    const technicians = await listTechnicians();
    return NextResponse.json({ success: true, data: technicians });
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
    if (session.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Sin permisos" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const parsed = createTechnicianSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const technician = await createTechnician(parsed.data);
    return NextResponse.json(
      { success: true, data: technician },
      { status: 201 },
    );
  } catch (error: any) {
    const status =
      error.message === "Unauthorized"
        ? 401
        : error.message?.includes("permisos")
          ? 403
          : error.message?.includes("ya está registrado")
            ? 409
            : 500;
    return NextResponse.json(
      { success: false, error: error.message ?? "Error interno" },
      { status },
    );
  }
}
