import { notFound } from "next/navigation";
import { db } from "@/lib/prisma";
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
  const service = await db.orm.public.Service
    .include("technician", (t: any) => t)
    .include("client", (c: any) => c)
    .include("createdBy", (u: any) => u)
    .include("payment", (p: any) => p)
    .first({ id });

  if (!service) {
    notFound();
  }

  const technicians = await db.orm.public.User
    .where({ role: "TECHNICIAN" })
    .all();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <AdminServiceDetail
        service={serialize(service as any)}
        technicians={serialize(technicians.filter((t: any) => t.isActive) as any)}
      />
    </div>
  );
}
