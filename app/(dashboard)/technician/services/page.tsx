import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { TechnicianServicesList } from "@/components/technician/technician-services-list";
import { serialize } from "@/lib/utils";

export default async function TechnicianServicesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const services = await db.orm.public.Service
    .where({ technicianId: session.id })
    .include("technician", (t: any) => t)
    .include("client", (c: any) => c)
    .include("createdBy", (u: any) => u)
    .include("payment", (p: any) => p)
    .orderBy((s: any) => s.scheduledDate.desc())
    .all();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground md:text-2xl">
          Mis Servicios
        </h1>
        <p className="text-sm text-muted-foreground">
          Historial de todos tus servicios asignados
        </p>
      </div>

      <TechnicianServicesList services={serialize(services as any)} />
    </div>
  );
}
