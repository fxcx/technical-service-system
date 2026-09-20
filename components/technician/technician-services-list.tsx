"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formatTime,
  formatDate,
  getStatusLabel,
  getStatusColor,
  formatCurrency,
  toDate,
} from "@/lib/utils";
import { Calendar, ChevronRight, Filter } from "lucide-react";
import type { Service, ServiceStatus } from "@/types";

interface TechnicianServicesListProps {
  services: Service[];
}

export function TechnicianServicesList({
  services,
}: TechnicianServicesListProps) {
  const [filter, setFilter] = useState<ServiceStatus | "ALL">("ALL");

  const filteredServices =
    filter === "ALL" ? services : services.filter((s) => s.status === filter);

  // Group by date
  const groupedServices = filteredServices.reduce((acc, service) => {
    const date = toDate(service.scheduledDate).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select
          value={filter}
          onValueChange={(v) => setFilter(v as ServiceStatus | "ALL")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            <SelectItem value="PENDING">Pendientes</SelectItem>
            <SelectItem value="IN_PROGRESS">En Curso</SelectItem>
            <SelectItem value="COMPLETED">Completados</SelectItem>
            <SelectItem value="CANCELLED">Cancelados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {Object.entries(groupedServices).map(([date, dateServices]) => (
        <div key={date} className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {formatDate(new Date(date))}
          </div>
          <div className="space-y-2">
            {dateServices.map((service) => (
              <Card key={service.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-medium text-sm">
                        {formatTime(service.scheduledDate).split(" ")[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">
                            {service.observation}
                          </p>
                          <Badge
                            className={getStatusColor(service.status)}
                            variant="secondary"
                          >
                            {getStatusLabel(service.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {service.client?.name}
                        </p>
                        {service.payment && (
                          <p className="text-sm font-medium text-emerald-600">
                            {formatCurrency(service.payment.amountPaid)}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/technician/services/${service.id}`}>
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No se encontraron servicios</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
