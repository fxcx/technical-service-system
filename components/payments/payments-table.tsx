"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate, formatCurrency, getPaymentMethodLabel } from "@/lib/utils";
import { DollarSign, Calendar } from "lucide-react";
import type { Payment, User } from "@/types";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from "date-fns";

interface PaymentsTableProps {
  payments: Payment[];
  technicians: User[];
}

export function PaymentsTable({ payments, technicians }: PaymentsTableProps) {
  const [technicianFilter, setTechnicianFilter] = useState<string>("ALL");
  const [timeFilter, setTimeFilter] = useState<string>("ALL");

  const filteredPayments = payments.filter((payment) => {
    const matchesTechnician =
      technicianFilter === "ALL" || payment.technicianId === technicianFilter;

    let matchesTime = true;
    const paymentDate = new Date(payment.createdAt);
    const now = new Date();

    if (timeFilter === "WEEK") {
      matchesTime = isWithinInterval(paymentDate, {
        start: startOfWeek(now, { weekStartsOn: 1 }), // Monday start
        end: endOfWeek(now, { weekStartsOn: 1 }),
      });
    } else if (timeFilter === "MONTH") {
      matchesTime = isWithinInterval(paymentDate, {
        start: startOfMonth(now),
        end: endOfMonth(now),
      });
    }

    return matchesTechnician && matchesTime;
  });

  const totalAmount = filteredPayments.reduce(
    (sum, p) => sum + Number(p.amountPaid),
    0
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {filteredPayments.length} cobros - {formatCurrency(totalAmount)}
            </CardTitle>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
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
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Histórico</SelectItem>
                <SelectItem value="WEEK">Esta Semana</SelectItem>
                <SelectItem value="MONTH">Este Mes</SelectItem>
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
                <TableHead>Técnico</TableHead>
                <TableHead>Método</TableHead>

                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No se encontraron cobros
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{formatDate(payment.createdAt)}</TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/services/${payment.serviceId}`}
                        className="text-primary hover:underline"
                      >
                        {payment.service?.title}
                      </Link>
                    </TableCell>
                    <TableCell>{payment.technician?.name}</TableCell>
                    <TableCell>
                      {getPaymentMethodLabel(payment.method)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(payment.amountPaid)}
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
