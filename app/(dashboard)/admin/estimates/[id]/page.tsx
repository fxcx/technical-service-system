import { notFound } from "next/navigation"
import { db } from "@/lib/prisma"
import { EstimateDetail } from "@/components/estimates/estimate-detail"
import { serialize } from "@/lib/utils"

export const revalidate = 0 // Ensure fresh data on details page

interface EstimatePageProps {
  params: Promise<{ id: string }>
}

export default async function AdminEstimatePage({ params }: EstimatePageProps) {
  const { id } = await params

  const estimate = await db.orm.public.Estimate
    .include("service", (s: any) => s.include("technician", (t: any) => t).include("client", (c: any) => c))
    .first({ id })

  if (!estimate) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Detalle del Presupuesto
        </h1>
        <p className="text-muted-foreground">
          Información del presupuesto ingresado por el técnico
        </p>
      </div>

      <EstimateDetail estimate={serialize(estimate as any)} />
    </div>
  )
}
