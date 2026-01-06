import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ClientDetail } from "@/components/clients/client-detail";
import { serialize } from "@/lib/utils";

interface ClientPageProps {
  params: Promise<{ id: string }>;
}

async function getClientHistory(clientId: string) {
  const client = await prisma.client.findUnique({ where: { id: clientId } });
  if (!client) return null;

  const services = await prisma.service.findMany({
    where: { clientId },
    include: {
      technician: true,
      payment: true,
    },
    orderBy: { scheduledDate: "desc" },
  });

  const totalServices = services.length;
  const completedServices = services.filter(
    (s) => s.status === "COMPLETED"
  ).length;
  const totalPaid = services.reduce(
    (sum, s) => sum + Number(s.payment?.amountPaid || 0),
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
        client={clientHistory.client}
        services={serialize(clientHistory.services)}
        stats={clientHistory.stats}
      />
    </div>
  );
}
