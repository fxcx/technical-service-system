import Link from "next/link";
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
  formatTime,
  getStatusLabel,
  getStatusColor,
  getRelativeDay,
  toDate,
} from "@/lib/utils";
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  ChevronRight,
  Calendar,
} from "lucide-react";
import type { Service } from "@/types";

interface TechnicianAgendaProps {
  services: Service[];
}

export function TechnicianAgenda({ services }: TechnicianAgendaProps) {
  if (services.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg mb-1">
            Sin servicios programados
          </h3>
          <p className="text-muted-foreground text-sm">
            No tienes servicios asignados próximamente
          </p>
        </CardContent>
      </Card>
    );
  }

  // Group services by date
  const groupedServices = services.reduce((acc, service) => {
    const dateKey = toDate(service.scheduledDate).toISOString().split("T")[0];
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  const sortedDates = Object.keys(groupedServices).sort();

  return (
    <div className="space-y-6">
      {sortedDates.map((dateKey) => (
        <div key={dateKey} className="space-y-3">
          <h3 className="font-medium text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {getRelativeDay(dateKey)}
          </h3>

          <div className="space-y-3">
            {groupedServices[dateKey].map((service) => {
              // Check if this is the absolute next pending service across all lists
              const isNext =
                service.status === "PENDING" &&
                services
                  .slice(0, services.indexOf(service))
                  .every((s) => s.status !== "PENDING");

              return (
                <Card
                  key={service.id}
                  className={isNext ? "ring-2 ring-primary" : ""}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold">
                          {formatTime(service.scheduledDate).split(" ")[0]}
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            {service.observation}
                          </CardTitle>
                          <CardDescription>
                            {service.client?.name}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        className={getStatusColor(service.status)}
                        variant="secondary"
                      >
                        {getStatusLabel(service.status)}
                      </Badge>
                    </div>
                    {isNext && (
                      <Badge variant="default" className="w-fit mt-2">
                        Siguiente servicio
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {service.observation && (
                      <p className="text-sm text-muted-foreground">
                        {service.observation}
                      </p>
                    )}

                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                        <span>{service.client?.address}</span>
                      </div>
                      {service.client?.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={`tel:${service.client.phone}`}
                            className="text-primary hover:underline"
                          >
                            {service.client.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      {service.client?.address && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          asChild
                        >
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(
                              service.client.address
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Navigation className="mr-2 h-4 w-4" />
                            Navegar
                          </a>
                        </Button>
                      )}
                      <Button size="sm" className="flex-1" asChild>
                        <Link href={`/technician/services/${service.id}`}>
                          Ver detalle
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
