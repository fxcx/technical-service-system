import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import {
  getClientById,
  updateClient,
  removeClient,
} from "@/lib/services/client.service";
import { updateClientSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth();
    const { id } = await params;
    const client = await getClientById(id);

    if (!client) {
      return NextResponse.json(
        { success: false, error: "Cliente no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: client });
  } catch (error: any) {
    const status = error.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json(
      { success: false, error: error.message ?? "Error interno" },
      { status },
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth();
    const { id } = await params;
    const body = await request.json();

    const parsed = updateClientSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const client = await updateClient(id, parsed.data);
    return NextResponse.json({ success: true, data: client });
  } catch (error: any) {
    const status =
      error.message === "Unauthorized"
        ? 401
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
    await requireAuth();
    const { id } = await params;
    await removeClient(id);
    return NextResponse.json({ success: true, message: "Cliente eliminado" });
  } catch (error: any) {
    const status =
      error.message === "Unauthorized"
        ? 401
        : error.message?.includes("no encontrad")
          ? 404
          : error.message?.includes("servicios asociados")
            ? 400
            : 500;
    return NextResponse.json(
      { success: false, error: error.message ?? "Error interno" },
      { status },
    );
  }
}
