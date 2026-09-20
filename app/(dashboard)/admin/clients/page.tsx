import Link from "next/link";
import { db } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { ClientsTable } from "@/components/clients/clients-table";
import { Plus } from "lucide-react";

// Cache for 60 seconds - client data updates less frequently
export const revalidate = 60;

export default async function AdminClientsPage() {
  const clients = await db.orm.public.Client.orderBy((c: any) => c.createdAt.desc()).all();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">Gestiona tu base de clientes</p>
        </div>
        <Button asChild>
          <Link href="/admin/clients/new">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Cliente
          </Link>
        </Button>
      </div>

      <ClientsTable clients={clients} />
    </div>
  );
}
