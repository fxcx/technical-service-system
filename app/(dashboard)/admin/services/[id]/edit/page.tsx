import { db } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { ServiceForm } from "@/components/services/service-form";

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({
  params,
}: EditServicePageProps) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const { id } = await params;

  const service = await db.orm.public.Service.first({ id });

  if (!service) {
    notFound();
  }

  const clients = await db.orm.public.Client.orderBy((c: any) => c.createdAt.desc()).all();

  const technicians = await db.orm.public.User.where({ role: "TECHNICIAN" }).all();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Editar Servicio</h1>
        <p className="text-muted-foreground">
          Modifica los detalles del servicio y su asignación
        </p>
      </div>

      <ServiceForm
        clients={clients}
        technicians={technicians.filter((t) => t.isActive)}
        createdById={service.createdById}
        service={service as any}
      />
    </div>
  );
}
