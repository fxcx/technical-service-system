"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { formatDate, formatCurrency } from "@/lib/utils"
import {
  ArrowLeft,
  User,
  Calendar,
  DollarSign,
  CheckCircle2,
  ClipboardList,
  Info,
  FileText,
} from "lucide-react"
import type { Estimate } from "@/types"

interface EstimateDetailProps {
  estimate: Estimate
}

export function EstimateDetail({ estimate }: EstimateDetailProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(estimate.status)

  const handleFinalize = async () => {
    if (
      !confirm(
        "¿Estás seguro de que deseas marcar este presupuesto como Finalizado?",
      )
    ) {
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/estimates/${estimate.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setStatus("COMPLETED")
        toast.success("Presupuesto marcado como Finalizado con éxito")
        router.refresh()
      } else {
        toast.error(data.error || "Error al procesar la solicitud")
      }
    } catch (error) {
      console.error(error)
      toast.error("Error al conectar con el servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/estimates">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a presupuestos
          </Link>
        </Button>

        {status === "PENDING" && (
          <Button
            onClick={handleFinalize}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition-colors text-sm py-1.5 px-4 rounded-md flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Finalizar Presupuesto
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Details Panel */}
        <Card className="md:col-span-2 shadow-sm border-muted">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">
                  Presupuesto para: {estimate.service?.observation}
                </CardTitle>
                <CardDescription className="mt-1">
                  OT-
                  {String(estimate.service?.orderNumber ?? "").padStart(6, "0")}
                </CardDescription>
              </div>
              <Badge
                className={
                  status === "PENDING"
                    ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50"
                }
                variant="outline"
              >
                {status === "PENDING" ? "Pendiente" : "Finalizado"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Monto */}
            <div className="rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    Monto Presupuestado
                  </span>
                  <p className="text-3xl font-extrabold text-foreground tracking-tight">
                    {formatCurrency(estimate.amount)}
                  </p>
                </div>
              </div>
              {estimate.completedAt && (
                <div className="text-right text-xs text-muted-foreground">
                  <span>Finalizado el:</span>
                  <p className="font-semibold text-foreground">
                    {formatDate(estimate.completedAt)}
                  </p>
                </div>
              )}
            </div>

            {/* Servicio Original */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground flex items-center gap-1.5">
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
                Detalle del servicio solicitado
              </h4>
              <p className="text-sm text-foreground bg-muted/40 p-4 rounded-lg border border-dashed">
                {estimate.service?.observation ||
                  "Sin descripción adicional en la orden original."}
              </p>
            </div>

            {/* Descripcion Presupuesto */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Propuesta técnica / Diagnóstico
              </h4>
              <p className="text-sm text-foreground bg-muted/40 p-4 rounded-lg border">
                {estimate.description ||
                  "No se especificó un diagnóstico detallado."}
              </p>
            </div>

            {/* Notes */}
            {estimate.notes && (
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  Notas adicionales
                </h4>
                <p className="text-sm text-muted-foreground bg-amber-50/20 dark:bg-amber-950/5 border border-amber-100 dark:border-amber-900/30 p-4 rounded-lg">
                  {estimate.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Client & Technician info */}
        <div className="space-y-6">
          {/* Client Card */}
          <Card className="shadow-sm border-muted">
            <CardHeader className="pb-3 bg-muted/20">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Información del Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <div>
                <span className="text-xs text-muted-foreground block font-medium">
                  Nombre
                </span>
                {estimate.service?.client ? (
                  <Link
                    href={`/admin/clients/${estimate.service?.client.id}`}
                    className="text-primary hover:underline font-semibold text-sm"
                  >
                    {estimate.service?.client?.name || "Sin nombre"}
                  </Link>
                ) : (
                  <span className="text-sm font-medium text-foreground">
                    Sin cliente
                  </span>
                )}
              </div>
              <Separator className="bg-neutral-100 dark:bg-neutral-800" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">
                  Teléfono
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {estimate.service?.client?.phone || "No informado"}
                </span>
              </div>
              {estimate.service?.client?.email && (
                <>
                  <Separator className="bg-neutral-100 dark:bg-neutral-800" />
                  <div>
                    <span className="text-xs text-muted-foreground block font-medium">
                      Email
                    </span>
                    <span className="text-sm text-foreground break-all">
                      {estimate.service?.client.email}
                    </span>
                  </div>
                </>
              )}
              {estimate.service?.client?.address && (
                <>
                  <Separator className="bg-neutral-100 dark:bg-neutral-800" />
                  <div>
                    <span className="text-xs text-muted-foreground block font-medium">
                      Dirección
                    </span>
                    <span className="text-sm text-foreground">
                      {estimate.service?.client.address}
                      {estimate.service?.client.locality && `, ${estimate.service?.client.locality}`}
                    </span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Service Assignment & Technician Card */}
          <Card className="shadow-sm border-muted">
            <CardHeader className="pb-3 bg-muted/20">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Técnico que presupuestó
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <div>
                <span className="text-xs text-muted-foreground block font-medium">
                  Nombre del técnico
                </span>
                {estimate.service?.technician ? (
                  <Link
                    href={`/admin/technicians/${estimate.service.technician.id}`}
                    className="text-primary hover:underline font-semibold text-sm"
                  >
                    {estimate.service.technician.name}
                  </Link>
                ) : (
                  <span className="text-sm font-semibold text-foreground">
                    Sin asignar / Sin técnico
                  </span>
                )}
              </div>
              <Separator className="bg-neutral-100 dark:bg-neutral-800" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">
                  Fecha de creación
                </span>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {formatDate(estimate.createdAt)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
