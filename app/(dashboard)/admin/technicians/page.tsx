import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Phone, Eye, Plus } from "lucide-react";
import { TechnicianActions } from "@/components/technicians/technician-actions";
import { serialize } from "@/lib/utils";
import type { User } from "@/types";

export default async function AdminTechniciansPage() {
  const technicians = await prisma.user.findMany({
    where: { role: "TECHNICIAN" },
  });
  const payments = await prisma.payment.findMany();

  // Calculate stats per technician
  const technicianStats = technicians.map((tech) => {
    const techPayments = payments.filter((p) => p.technicianId === tech.id);
    const totalCollected = techPayments.reduce(
      (sum, p) => sum + Number(p.amountPaid),
      0
    );

    return {
      ...tech,
      totalCollected,
      paymentCount: techPayments.length,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Técnicos</h1>
          <p className="text-muted-foreground">
            Gestiona el equipo de técnicos
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/technicians/new">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Técnico
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {serialize(technicianStats).map((tech) => (
          <TechnicianCard key={tech.id} technician={tech} />
        ))}
      </div>
    </div>
  );
}

interface TechnicianCardProps {
  technician: User & {
    totalCollected: number;
    paymentCount: number;
  };
}

function TechnicianCard({ technician }: TechnicianCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-lg font-semibold">
              {technician.name?.charAt(0) || "T"}
            </div>
            <div>
              <CardTitle className="text-lg">{technician.name}</CardTitle>
              <CardDescription>{technician.email}</CardDescription>
            </div>
          </div>
          <Badge variant={technician.isActive ? "default" : "secondary"}>
            {technician.isActive ? "Activo" : "Inactivo"}
          </Badge>
          <div className="ml-2">
            <TechnicianActions technician={technician} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {technician.phone && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            {technician.phone}
          </div>
        )}

        <div className="pt-2">
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-sm text-muted-foreground">Total cobrado</p>
            <p className="text-lg font-bold">
              {formatCurrency(technician.totalCollected)}
            </p>
          </div>
        </div>

        <Button asChild className="w-full bg-transparent" variant="outline">
          <Link href={`/admin/technicians/${technician.id}`}>
            <Eye className="mr-2 h-4 w-4" />
            Ver detalle
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
