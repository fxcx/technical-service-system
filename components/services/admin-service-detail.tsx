"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  formatDate,
  formatTime,
  formatCurrency,
  getStatusLabel,
  getStatusColor,
  getPaymentMethodLabel,
} from "@/lib/utils";
import { ArrowLeft, MapPin, Phone, Clock, Edit } from "lucide-react";
import type { Service, User as UserType, ServiceStatus } from "@/types";

interface AdminServiceDetailProps {
  service: Service;
  technicians: UserType[];
}

export function AdminServiceDetail({
  service,
  technicians,
}: AdminServiceDetailProps) {
  const router = useRouter();
  const [status, setStatus] = useState(service.status);
  const [technicianId, setTechnicianId] = useState(service.technicianId || "");
  const [loading, setLoading] = useState(false);

  async function handleStatusChange(newStatus: ServiceStatus) {
    setLoading(true);
    try {
      const res = await fetch(`/api/services/${service.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Error al actualizar");

      setStatus(newStatus);
      toast.success("Estado actualizado");
      router.refresh();
    } catch {
      toast.error("Error al actualizar el estado");
    } finally {
      setLoading(false);
    }
  }

  async function handleTechnicianChange(newTechnicianId: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ technicianId: newTechnicianId }),
      });

      if (!res.ok) throw new Error("Error al actualizar");

      setTechnicianId(newTechnicianId);
      toast.success("Técnico asignado");
      router.refresh();
    } catch {
      toast.error("Error al asignar técnico");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/services">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a servicios
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/services/${service.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{service.title}</CardTitle>
              <CardDescription>ID: {service.id}</CardDescription>
            </div>
            <Badge className={getStatusColor(status)} variant="secondary">
              {getStatusLabel(status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {service.description && (
            <div>
              <h4 className="font-medium mb-1">Descripción</h4>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          )}

          {service.expectedAmount && (
            <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-4">
              <h4 className="font-medium text-emerald-800 mb-1">
                Monto esperado
              </h4>
              <p className="text-2xl font-bold text-emerald-700">
                {formatCurrency(service.expectedAmount)}
              </p>
            </div>
          )}

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-3">Información del servicio</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {formatDate(service.scheduledDate)} -{" "}
                    {formatTime(service.scheduledTime)}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{service.address || service.client?.address}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Cliente</h4>
              <div className="space-y-2 text-sm">
                <Link
                  href={`/admin/clients/${service.clientId}`}
                  className="text-primary hover:underline font-medium"
                >
                  {service.client?.name}
                </Link>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{service.client?.address}</span>
                </div>
                {service.client?.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{service.client.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Técnico asignado</h4>
              <Select
                value={technicianId}
                onValueChange={handleTechnicianChange}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar técnico" />
                </SelectTrigger>
                <SelectContent>
                  {technicians.map((tech) => (
                    <SelectItem key={tech.id} value={tech.id}>
                      {tech.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Estado del servicio</h4>
              <Select
                value={status}
                onValueChange={(v) => handleStatusChange(v as ServiceStatus)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pendiente</SelectItem>
                  <SelectItem value="IN_PROGRESS">En Curso</SelectItem>
                  <SelectItem value="COMPLETED">Completado</SelectItem>
                  <SelectItem value="CANCELLED">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {service.payment && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-3">Información de pago</h4>
                <div className="rounded-lg bg-emerald-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-emerald-700">
                        {formatCurrency(service.payment.amountPaid)}
                      </p>
                      <p className="text-sm text-emerald-600">
                        {getPaymentMethodLabel(service.payment.method)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {service.completedPhotoUrl && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-3">Comprobante del servicio</h4>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                  <img
                    src={service.completedPhotoUrl}
                    alt="Comprobante del servicio"
                    className="h-full w-full object-cover"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute bottom-2 right-2 h-8"
                    asChild
                  >
                    <a
                      href={service.completedPhotoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver pantalla completa
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}

          {service.notes && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-1">Notas internas</h4>
                <p className="text-muted-foreground">{service.notes}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
