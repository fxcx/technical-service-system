import { prisma } from "@/lib/prisma";
import { PaymentsTable } from "@/components/payments/payments-table";
import { Role } from "@/generated/prisma";

export default async function AdminPaymentsPage() {
  const payments = await prisma.payment.findMany({
    include: {
      service: true,
      technician: true,
    },
    orderBy: { createdAt: "desc" },
  });
  const technicians = await prisma.user.findMany({
    where: { role: Role.TECHNICIAN },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Cobros</h1>
        <p className="text-muted-foreground">
          Gestiona los cobros realizados por técnicos
        </p>
      </div>

      <PaymentsTable payments={payments} technicians={technicians} />
    </div>
  );
}
