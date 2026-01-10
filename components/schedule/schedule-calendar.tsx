"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatTime, getStatusColor } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import type { Service, User } from "@/types";

interface ScheduleCalendarProps {
  services: Service[];
  technicians?: User[];
  isAdminView?: boolean;
  basePath?: string; // Base path for links, e.g., "/admin/services" or "/technician/services"
}

export function ScheduleCalendar({
  services,
  technicians = [],
  isAdminView = true,
  basePath = "/admin/services",
}: ScheduleCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [technicianFilter, setTechnicianFilter] = useState<string>("ALL");

  // Get week dates
  const getWeekDates = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + 1); // Monday
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentDate);
  const today = new Date();

  const filteredServices = services.filter((service) => {
    if (
      isAdminView &&
      technicianFilter !== "ALL" &&
      service.technicianId !== technicianFilter
    ) {
      return false;
    }
    const serviceDate = new Date(service.scheduledDate);
    return weekDates.some(
      (d) => d.toDateString() === serviceDate.toDateString()
    );
  });

  const getServicesForDate = (date: Date) => {
    return filteredServices
      .filter(
        (s) => new Date(s.scheduledDate).toDateString() === date.toDateString()
      )
      .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={goToNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={goToToday}>
              Hoy
            </Button>
            <CardTitle className="text-lg ml-2">
              {weekDates[0].toLocaleDateString("es-CL", {
                month: "long",
                year: "numeric",
              })}
            </CardTitle>
          </div>
          {isAdminView && (
            <div className="flex items-center gap-2">
              <Select
                value={technicianFilter}
                onValueChange={setTechnicianFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar técnico" />
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
              <Button asChild>
                <Link href="/admin/services/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo
                </Link>
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {/* Headers */}
          {weekDates.map((date) => {
            const isToday = date.toDateString() === today.toDateString();
            return (
              <div
                key={date.toISOString()}
                className={`text-center p-2 rounded-lg ${
                  isToday ? "bg-primary/10" : ""
                }`}
              >
                <p className="text-sm font-medium text-muted-foreground">
                  {date.toLocaleDateString("es-CL", { weekday: "short" })}
                </p>
                <p
                  className={`text-lg font-bold ${
                    isToday ? "text-primary" : ""
                  }`}
                >
                  {date.getDate()}
                </p>
              </div>
            );
          })}

          {/* Day columns */}
          {weekDates.map((date) => {
            const dayServices = getServicesForDate(date);
            const isToday = date.toDateString() === today.toDateString();
            return (
              <div
                key={date.toISOString() + "-services"}
                className={`min-h-[200px] rounded-lg border p-2 ${
                  isToday ? "border-primary/30 bg-primary/5" : ""
                }`}
              >
                {dayServices.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                    Sin servicios
                  </div>
                ) : (
                  <div className="space-y-2">
                    {dayServices.map((service) => (
                      <Link
                        key={service.id}
                        href={`${basePath}/${service.id}`}
                        className={`block rounded-md p-2 text-xs transition-colors hover:opacity-80 ${getStatusColor(
                          service.status
                        )}`}
                      >
                        <p className="font-medium truncate">
                          {formatTime(service.scheduledTime)}
                        </p>
                        <p className="truncate">{service.title}</p>
                        {isAdminView && service.technician && (
                          <p className="truncate text-[10px] opacity-80">
                            {service.technician.name}
                          </p>
                        )}
                        {!isAdminView && service.client && (
                          <p className="truncate text-[10px] opacity-80">
                            {service.client.name}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
