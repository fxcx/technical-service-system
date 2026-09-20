import Link from "next/link";
import { db } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { ServicesTable } from "@/components/services/services-table";
import { Plus } from "lucide-react";
import { serialize } from "@/lib/utils";

// Cache for 30 seconds - services list updates frequently
export const revalidate = 30;

export default async function AdminServicesPage() {
  const services = await db.orm.public.Service
    .include("technician", (t: any) => t)
    .include("client", (c: any) => c)
    .include("createdBy", (u: any) => u)
    .include("payment", (p: any) => p)
    .orderBy((s: any) => s.scheduledDate.desc())
    .all();
    
  const technicians = await db.orm.public.User
    .where({ role: "TECHNICIAN" })
    .all();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Servicios</h1>
          <p className="text-muted-foreground">
            Gestiona todos los servicios del sistema
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Servicio
          </Link>
        </Button>
      </div>

      <ServicesTable
        services={serialize(services as any)}
        technicians={serialize(technicians as any)}
      />
    </div>
  );
}
