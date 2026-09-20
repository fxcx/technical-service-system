import { db } from "@/lib/prisma"
import { PaymentsTable } from "@/components/paymentsRendition/payments-table"
import { serialize } from "@/lib/utils"

// Cache for 30 seconds - payments data updates frequently
export const revalidate = 30

export default async function AdminPaymentsPage() {
  const payments = await db.orm.public.Payment
    .include("service", (s: any) => s.include("client", (c: any) => c))
    .include("technician", (t: any) => t)
    .orderBy((p: any) => p.createdAt.desc())
    .all()

  const technicians = await db.orm.public.User
    .where({ role: "TECHNICIAN" })
    .all()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Cobros</h1>
        <p className="text-muted-foreground">
          Gestiona los cobros realizados por técnicos
        </p>
      </div>

      <PaymentsTable
        payments={serialize(payments as any)}
        technicians={serialize(technicians as any)}
      />
    </div>
  )
}
