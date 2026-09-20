import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { listClients, createClient } from "@/lib/services/client.service";
import { createClientSchema } from "@/lib/validations";

export async function GET() {
  try {
    await requireAuth();
    const clients = await listClients();
    return NextResponse.json({ success: true, data: clients });
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
    await requireAuth();
    const body = await request.json();

    const parsed = createClientSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const client = await createClient(parsed.data);
    return NextResponse.json({ success: true, data: client }, { status: 201 });
  } catch (error: any) {
    const status = error.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json(
      { success: false, error: error.message ?? "Error interno" },
      { status },
    );
  }
}
