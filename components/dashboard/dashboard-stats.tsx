import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, CheckCircle, Users, AlertCircle } from "lucide-react";

interface DashboardStatsProps {
  stats: {
    todayServices: number;
    pendingServices: number;
    inProgressServices: number;
    completedThisMonth: number;
    activeTechnicians: number;
    totalClients: number;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: "Servicios Hoy",
      value: stats.todayServices,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pendientes",
      value: stats.pendingServices,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "En Curso",
      value: stats.inProgressServices,
      icon: AlertCircle,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Completados (mes)",
      value: stats.completedThisMonth,
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Técnicos Activos",
      value: stats.activeTechnicians,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Clientes",
      value: stats.totalClients,
      icon: Users,
      color: "text-slate-600",
      bgColor: "bg-slate-50",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
