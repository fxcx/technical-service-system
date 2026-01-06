import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ServiceDetail } from "@/components/technician/service-detail";
import { serialize } from "@/lib/utils";

interface ServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function TechnicianServicePage({
  params,
}: ServicePageProps) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { id } = await params;
  const service = await prisma.service.findUnique({
    where: { id },
    include: {
      technician: true,
      client: true,
      createdBy: true,
      payment: true,
    },
  });

  if (!service) {
    notFound();
  }

  // Verify technician owns this service
  if (service.technicianId !== session.id) {
    redirect("/technician/dashboard");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <ServiceDetail service={serialize(service)} />
    </div>
  );
}
