import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatDate,
  formatTime,
  formatCurrency,
  getStatusLabel,
  getStatusColor,
} from "@/lib/utils";
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
} from "lucide-react";

interface TechnicianPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminTechnicianPage({
  params,
}: TechnicianPageProps) {
  const { id } = await params;
  const technician = await db.orm.public.User.first({ id });

  if (!technician || technician.role !== "TECHNICIAN") {
    notFound();
  }

  const services = await db.orm.public.Service
    .where({ technicianId: id })
    .include("technician", (t: any) => t)
    .include("client", (c: any) => c)
    .include("createdBy", (u: any) => u)
    .include("payment", (p: any) => p)
    .orderBy((s: any) => s.scheduledDate.desc())
    .all();
    
  const payments = await db.orm.public.Payment
    .where({ technicianId: id })
    .all();

  const stats = {
    totalServices: services.length,
    completedServices: services.filter((s: any) => s.status === "COMPLETED").length,
    pendingServices: services.filter((s: any) => s.status === "PENDING").length,
    totalCollected: payments.reduce((sum: number, p: any) => sum + Number(p.amountPaid), 0),
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/technicians">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a técnicos
        </Link>
      </Button>

      {/* Technician Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-semibold">
                {technician.name?.charAt(0) || "T"}
              </div>
              <div>
                <CardTitle className="text-xl">{technician.name}</CardTitle>
                <CardDescription>
                  Técnico desde {formatDate(technician.createdAt)}
                </CardDescription>
              </div>
            </div>
            <Badge variant={technician.isActive ? "default" : "secondary"}>
              {technician.isActive ? "Activo" : "Inactivo"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              {technician.email}
            </div>
            {technician.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {technician.phone}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <Calendar className="h-6 w-6 text-blue-600 mb-2" />
            <p className="text-2xl font-bold">{stats.totalServices}</p>
            <p className="text-xs text-muted-foreground">Total servicios</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <CheckCircle className="h-6 w-6 text-emerald-600 mb-2" />
            <p className="text-2xl font-bold">{stats.completedServices}</p>
            <p className="text-xs text-muted-foreground">Completados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <Clock className="h-6 w-6 text-amber-600 mb-2" />
            <p className="text-2xl font-bold">{stats.pendingServices}</p>
            <p className="text-xs text-muted-foreground">Pendientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <DollarSign className="h-6 w-6 text-green-600 mb-2" />
            <p className="text-lg font-bold">
              {formatCurrency(stats.totalCollected)}
            </p>
            <p className="text-xs text-muted-foreground">Cobrado</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Services */}
      <Card>
        <CardHeader>
          <CardTitle>Servicios Recientes</CardTitle>
          <CardDescription>
            Últimos servicios asignados a este técnico
          </CardDescription>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No hay servicios asignados a este técnico
            </div>
          ) : (
            <div className="space-y-3">
              {services.slice(0, 10).map((service: any) => (
                <Link
                  key={service.id}
                  href={`/admin/services/${service.id}`}
                  className="flex items-start justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{service.title}</p>
                      <Badge
                        className={getStatusColor(service.status)}
                        variant="secondary"
                      >
                        {getStatusLabel(service.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(service.scheduledDate)} -{" "}
                      {formatTime(service.scheduledTime)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {service.client?.name}
                    </p>
                  </div>
                  {service.payment && (
                    <span className="font-medium text-emerald-600">
                      {formatCurrency(service.payment.amountPaid)}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
