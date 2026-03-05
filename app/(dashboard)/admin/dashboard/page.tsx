import { prisma } from "@/lib/prisma";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { TodayServices } from "@/components/dashboard/today-services";

// Cache this page for 60 seconds to reduce database load
export const revalidate = 60;

async function getDashboardData() {
  const today = new Date();
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Execute all queries in parallel for better performance
  const [
    todayServicesData,
    pendingServices,
    inProgressServices,
    completedThisMonth,
    activeTechnicians,
    totalClients,
  ] = await Promise.all([
    // Get full today's services data instead of just counting
    prisma.service.findMany({
      where: {
        scheduledDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        technician: true,
        client: true,
        createdBy: true,
        payment: true,
      },
      orderBy: { scheduledTime: "asc" },
    }),
    prisma.service.count({ where: { status: "PENDING" } }),
    prisma.service.count({ where: { status: "IN_PROGRESS" } }),
    prisma.service.count({
      where: {
        status: "COMPLETED",
        scheduledDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    }),
    prisma.user.count({ where: { role: "TECHNICIAN", isActive: true } }),
    prisma.client.count(),
  ]);

  return {
    stats: {
      todayServices: todayServicesData.length,
      pendingServices,
      inProgressServices,
      completedThisMonth,
      activeTechnicians,
      totalClients,
    },
    todayServices: todayServicesData,
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
