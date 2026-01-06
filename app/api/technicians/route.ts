import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "No autorizado" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, email, password, phone } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "El email ya está registrado" },
        { status: 400 }
      );
    }

    const passwordHash = await hash(password, 10);

    const technician = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        phone,
        role: "TECHNICIAN",
        isActive: true,
      },
    });

    // Remove passwordHash from response
    const { passwordHash: _, ...userWithoutPassword } = technician;

    return NextResponse.json({ success: true, data: userWithoutPassword });
  } catch (error) {
    console.error("Error creating technician:", error);
    return NextResponse.json(
      { success: false, error: "Error al crear técnico" },
      { status: 500 }
    );
  }
}
