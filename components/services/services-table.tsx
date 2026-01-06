"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  formatDate,
  formatTime,
  getStatusLabel,
  getStatusColor,
  formatCurrency,
} from "@/lib/utils";
import { Search, Eye, Calendar, Filter, Pencil, Trash2 } from "lucide-react";
import type { Service, User, ServiceStatus } from "@/types";

interface ServicesTableProps {
  services: Service[];
  technicians: User[];
}

export function ServicesTable({ services, technicians }: ServicesTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ServiceStatus | "ALL">(
    "ALL"
  );
  const [technicianFilter, setTechnicianFilter] = useState<string>("ALL");
  const router = useRouter();

  async function handleDelete(id: string) {
    if (
      !confirm(
        "¿Estás seguro de que deseas eliminar este servicio? El pago asociado también se eliminará."
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Error al eliminar el servicio");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error al eliminar el servicio");
    }
  }

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(search.toLowerCase()) ||
      service.client?.name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || service.status === statusFilter;
    const matchesTechnician =
      technicianFilter === "ALL" || service.technicianId === technicianFilter;

    return matchesSearch && matchesStatus && matchesTechnician;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {filteredServices.length} servicios
          </CardTitle>
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-full md:w-[200px]"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as ServiceStatus | "ALL")}
            >
              <SelectTrigger className="w-full md:w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos</SelectItem>
                <SelectItem value="PENDING">Pendiente</SelectItem>
                <SelectItem value="IN_PROGRESS">En Curso</SelectItem>
                <SelectItem value="COMPLETED">Completado</SelectItem>
                <SelectItem value="CANCELLED">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={technicianFilter}
              onValueChange={setTechnicianFilter}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Técnico" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos los técnicos</SelectItem>
                {technicians.map((tech) => (
                  <SelectItem key={tech.id} value={tech.id}>
                    {tech.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Técnico</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Pago</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No se encontraron servicios
                  </TableCell>
                </TableRow>
              ) : (
                filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div className="text-sm">
                        <div>{formatDate(service.scheduledDate)}</div>
                        <div className="text-muted-foreground">
                          {formatTime(service.scheduledTime)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{service.title}</div>
                      {service.description && (
                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {service.description}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/clients/${service.clientId}`}
                        className="text-primary hover:underline"
                      >
                        {service.client?.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {service.technician ? (
                        <Link
                          href={`/admin/technicians/${service.technicianId}`}
                          className="text-primary hover:underline"
                        >
                          {service.technician.name}
                        </Link>
                      ) : (
                        <span className="text-amber-600">Sin asignar</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={getStatusColor(service.status)}
                        variant="secondary"
                      >
                        {getStatusLabel(service.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {service.payment ? (
                        <div className="flex flex-col">
                          <span className="font-medium text-emerald-600">
                            {formatCurrency(service.payment.amountPaid)}
                          </span>
                          {Number(service.payment.debtAmount) > 0 && (
                            <span className="text-xs font-medium text-red-600">
                              Debe: {formatCurrency(service.payment.debtAmount)}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/services/${service.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(service.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
