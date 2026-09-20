import { notFound } from "next/navigation";
import { db } from "@/lib/prisma";
import { ClientDetail } from "@/components/clients/client-detail";
import { serialize } from "@/lib/utils";

interface ClientPageProps {
  params: Promise<{ id: string }>;
}

async function getClientHistory(clientId: string) {
  const client = await db.orm.public.Client.first({ id: clientId });
  if (!client) return null;

  const services = await db.orm.public.Service
    .where({ clientId })
    .include("technician", (t: any) => t)
    .include("payment", (p: any) => p)
    .orderBy((s: any) => s.scheduledDate.desc())
    .all();

  const totalServices = services.length;
  const completedServices = services.filter(
    (s: any) => s.status === "COMPLETED"
  ).length;
  const totalPaid = services.reduce(
    (sum: number, s: any) => sum + Number(s.payment?.amountPaid || 0),
    0
  );

  return {
    client,
    services,
    stats: {
      totalServices,
      completedServices,
      totalPaid,
    },
  };
}

export default async function AdminClientPage({ params }: ClientPageProps) {
  const { id } = await params;
  const clientHistory = await getClientHistory(id);

  if (!clientHistory) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ClientDetail
        client={clientHistory.client as any}
        services={serialize(clientHistory.services as any)}
        stats={clientHistory.stats}
      />
    </div>
  );
}
