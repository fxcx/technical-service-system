import { db } from "@/lib/prisma"
import { EstimatesTable } from "@/components/estimates/estimates-table"
import { serialize } from "@/lib/utils"

export const revalidate = 0 // Disable static cache for estimates to ensure real-time status

export default async function AdminEstimatesPage() {
  const estimates = await db.orm.public.Estimate
    .include("service", (s: any) => s.include("client", (c: any) => c))
    .orderBy((e: any) => e.createdAt.desc())
    .all()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Presupuestos</h1>
        <p className="text-muted-foreground">
          Revisa y gestiona los presupuestos enviados por los técnicos
        </p>
      </div>

      <EstimatesTable initialEstimates={serialize(estimates as any)} />
    </div>
  )
}
