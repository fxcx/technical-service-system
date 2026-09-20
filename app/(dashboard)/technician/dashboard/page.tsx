import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { TechnicianAgenda } from "@/components/technician/technician-agenda";
import { TechnicianStats } from "@/components/technician/technician-stats";
import { serialize, startOfDayInstant } from "@/lib/utils";

export default async function TechnicianDashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const startOfDay = startOfDayInstant();

  const todayServices = await db.orm.public.Service
    .where({ technicianId: session.id })
    .where((s) => s.scheduledDate.gte(startOfDay))
    .where((s) => s.status.neq("CANCELLED"))
    .include("technician", (t) => t)
    .include("client", (c) => c)
    .include("createdBy", (u) => u)
    .include("payment", (p) => p)
    .orderBy((s) => s.scheduledDate.asc())
    .all();

  const stats = {
    todayCount: todayServices.length,
    pendingCount: todayServices.filter((s) => s.status === "PENDING").length,
    inProgressCount: todayServices.filter((s) => s.status === "IN_PROGRESS").length,
    completedCount: todayServices.filter((s) => s.status === "COMPLETED").length,
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground md:text-2xl">
          Mi Agenda
        </h1>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("es-CL", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>

      <TechnicianStats stats={stats} />
      <TechnicianAgenda services={serialize(todayServices)} />
    </div>
  );
}
