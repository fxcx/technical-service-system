import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { listServices, createService } from "@/lib/services/service.service";
import { createServiceSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth();
    const { searchParams } = new URL(request.url);

    const services = await listServices(
      {
        status: (searchParams.get("status") as any) ?? undefined,
        technicianId: searchParams.get("technicianId") ?? undefined,
        clientId: searchParams.get("clientId") ?? undefined,
        dateFrom: searchParams.get("dateFrom") ?? undefined,
        dateTo: searchParams.get("dateTo") ?? undefined,
      },
      session,
    );

    return NextResponse.json({ success: true, data: services });
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

    const parsed = createServiceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const service = await createService(parsed.data, session);
    return NextResponse.json({ success: true, data: service }, { status: 201 });
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
