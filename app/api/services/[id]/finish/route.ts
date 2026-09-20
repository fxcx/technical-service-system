import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { finishService } from "@/lib/services/service.service";
import { finishServiceSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await requireAuth();
    const { id } = await params;
    const body = await request.json();

    const parsed = finishServiceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const service = await finishService(id, parsed.data, session);
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
