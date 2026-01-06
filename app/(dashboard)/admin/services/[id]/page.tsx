import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminServiceDetail } from "@/components/services/admin-service-detail";
import { serialize } from "@/lib/utils";

interface ServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminServicePage({ params }: ServicePageProps) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

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

  const technicians = await prisma.user.findMany({
    where: { role: "TECHNICIAN" },
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <AdminServiceDetail
        service={serialize(service)}
        technicians={serialize(technicians.filter((t) => t.isActive))}
      />
    </div>
  );
}
