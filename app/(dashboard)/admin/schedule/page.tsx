import { prisma } from "@/lib/prisma";
import { ScheduleCalendar } from "@/components/schedule/schedule-calendar";

export default async function AdminSchedulePage() {
  const rawServices = await prisma.service.findMany({
    include: {
      technician: true,
      client: true,
      createdBy: true,
      payment: true,
    },
    orderBy: { scheduledDate: "desc" },
  });

  const services = rawServices.map((service) => ({
    ...service,
    expectedAmount: service.expectedAmount
      ? service.expectedAmount.toNumber()
      : null,
    payment: service.payment
      ? {
          ...service.payment,
          amountPaid: service.payment.amountPaid.toNumber(),
          sparePartsCost: service.payment.sparePartsCost.toNumber(),
          debtAmount: service.payment.debtAmount.toNumber(),
        }
      : null,
  }));
  const technicians = await prisma.user.findMany({
    where: { role: "TECHNICIAN" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Agenda</h1>
        <p className="text-muted-foreground">Vista de servicios programados</p>
      </div>

      <ScheduleCalendar
        services={services as any}
        technicians={technicians.filter((t) => t.isActive)}
      />
    </div>
  );
}
