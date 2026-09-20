import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatTime, getStatusLabel, getStatusColor } from "@/lib/utils"
import { MapPin, Clock, Plus } from "lucide-react"
import type { Service } from "@/types"

interface TodayServicesProps {
  services: Service[]
}

export function TodayServices({ services }: TodayServicesProps) {
  const sortedServices = [...services].sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate))

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Servicios de Hoy</CardTitle>
          <CardDescription>{services.length} servicios programados</CardDescription>
        </div>
        <Button asChild size="sm">
          <Link href="/admin/services/new">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {sortedServices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted p-3 mb-3">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No hay servicios programados para hoy</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedServices.map((service) => (
              <Link
                key={service.id}
                href={`/admin/services/${service.id}`}
                className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-medium text-sm">
                  {formatTime(service.scheduledDate).split(" ")[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{service.observation}</p>
                    <Badge className={getStatusColor(service.status)} variant="secondary">
                      {getStatusLabel(service.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{service.client?.name}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {service.client?.address}
                    </span>
                    {service.technician && (
                      <span className="flex items-center gap-1">Técnico: {service.technician.name}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
