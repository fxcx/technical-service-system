import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ScheduleCalendar } from "@/components/schedule/schedule-calendar";
import { serialize } from "@/lib/utils";

export default async function TechnicianSchedulePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const rawServices = await prisma.service.findMany({
    where: { technicianId: session.id },
    include: {
      technician: true,
      client: true,
      createdBy: true,
      payment: true,
    },
    orderBy: { scheduledDate: "desc" },
  });

  const services = serialize(rawServices);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground md:text-2xl">
          Mi Agenda
        </h1>
        <p className="text-muted-foreground">
          Vista semanal de tus servicios programados
        </p>
      </div>

      <ScheduleCalendar
        services={services as any}
        isAdminView={false}
        basePath="/technician/services"
      />
    </div>
  );
}
