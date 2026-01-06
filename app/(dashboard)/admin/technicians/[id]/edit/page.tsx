import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { TechnicianForm } from "@/components/technicians/technician-form";

interface EditTechnicianPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTechnicianPage({
  params,
}: EditTechnicianPageProps) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const { id } = await params;

  const technician = await prisma.user.findUnique({
    where: { id },
  });

  if (!technician || technician.role !== "TECHNICIAN") {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Editar Técnico</h1>
        <p className="text-muted-foreground">
          Modifica los datos del técnico y sus permisos
        </p>
      </div>

      <TechnicianForm technician={technician} />
    </div>
  );
}
