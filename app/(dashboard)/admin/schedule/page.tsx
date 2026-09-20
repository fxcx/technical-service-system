import { db } from "@/lib/prisma";
import { ScheduleCalendar } from "@/components/schedule/schedule-calendar";

export default async function AdminSchedulePage() {
  const rawServices = await db.orm.public.Service
    .include("technician", (t: any) => t)
    .include("client", (c: any) => c)
    .include("createdBy", (u: any) => u)
    .include("payment", (p: any) => p)
    .orderBy((s: any) => s.scheduledDate.desc())
    .all();

  const services = rawServices.map((service: any) => ({
    ...service,
    expectedAmount: service.expectedAmount
      ? Number(service.expectedAmount)
      : null,
    payment: service.payment
      ? {
          ...service.payment,
          amountPaid: Number(service.payment.amountPaid),
          sparePartsCost: Number(service.payment.sparePartsCost),
          debtAmount: Number(service.payment.debtAmount),
        }
      : null,
  }));
  const technicians = await db.orm.public.User
    .where({ role: "TECHNICIAN" })
    .all();

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
