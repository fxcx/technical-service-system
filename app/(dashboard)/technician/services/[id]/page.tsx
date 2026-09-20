import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
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
  const service = await db.orm.public.Service
    .include("technician", (t: any) => t)
    .include("client", (c: any) => c)
    .include("createdBy", (u: any) => u)
    .include("payment", (p: any) => p)
    .first({ id });

  if (!service) {
    notFound();
  }

  // Verify technician owns this service
  if (service.technicianId !== session.id) {
    redirect("/technician/dashboard");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <ServiceDetail service={serialize(service as any)} />
    </div>
  );
}
