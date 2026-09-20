import { db } from "@/lib/prisma";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { TodayServices } from "@/components/dashboard/today-services";
import {
  startOfDayInstant,
  endOfDayInstant,
  startOfMonthInstant,
  endOfMonthInstant,
} from "@/lib/utils";
import type { Service } from "@/types";

// Cache this page for 60 seconds to reduce database load
export const revalidate = 60;

async function getDashboardData() {
  const startOfDay = startOfDayInstant();
  const endOfDay = endOfDayInstant();
  const startOfMonth = startOfMonthInstant();
  const endOfMonth = endOfMonthInstant();

  // Execute all queries in parallel for better performance
  const [
    todayServicesData,
    pendingServicesResult,
    inProgressServicesResult,
    completedThisMonthResult,
    activeTechniciansResult,
    totalClientsResult,
  ] = await Promise.all([
    // Get full today's services data instead of just counting
    db.orm.public.Service
      .where((s) => s.scheduledDate.gte(startOfDay))
      .where((s) => s.scheduledDate.lte(endOfDay))
      .include("technician", (t) => t)
      .include("client", (c) => c)
      .include("createdBy", (u) => u)
      .include("payment", (p) => p)
      .orderBy((s) => s.scheduledDate.asc())
      .all(),
    db.orm.public.Service.where({ status: "PENDING" }).aggregate((a) => ({ count: a.count() })),
    db.orm.public.Service.where({ status: "IN_PROGRESS" }).aggregate((a) => ({ count: a.count() })),
    db.orm.public.Service
      .where({ status: "COMPLETED" })
      .where((s) => s.scheduledDate.gte(startOfMonth))
      .where((s) => s.scheduledDate.lte(endOfMonth))
      .aggregate((a) => ({ count: a.count() })),
    db.orm.public.User.where({ role: "TECHNICIAN", isActive: true }).aggregate((a) => ({ count: a.count() })),
    db.orm.public.Client.aggregate((a) => ({ count: a.count() })),
  ]);

  return {
    stats: {
      todayServices: todayServicesData.length,
      pendingServices: pendingServicesResult.count as number,
      inProgressServices: inProgressServicesResult.count as number,
      completedThisMonth: completedThisMonthResult.count as number,
      activeTechnicians: activeTechniciansResult.count as number,
      totalClients: totalClientsResult.count as number,
    },
    todayServices: todayServicesData as unknown as Service[],
  };
}

export default async function AdminDashboardPage() {
  const { stats, todayServices } = await getDashboardData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Resumen de operaciones y estado del sistema
        </p>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <TodayServices services={todayServices} />
      </div>
    </div>
  );
}
