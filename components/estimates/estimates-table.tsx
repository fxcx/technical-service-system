"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate, formatCurrency } from "@/lib/utils"
import { Search, Eye, CheckCircle, FileText, ClipboardList } from "lucide-react"
import type { Estimate } from "@/types"
import { toast } from "sonner"

interface EstimatesTableProps {
  initialEstimates: Estimate[]
}

export function EstimatesTable({ initialEstimates }: EstimatesTableProps) {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState<"PENDING" | "COMPLETED">("PENDING")
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleFinalize = async (id: string) => {
    if (
      !confirm(
        "¿Estás seguro de que deseas marcar este presupuesto como Finalizado?",
      )
    ) {
      return
    }

    setIsLoading(id)
    try {
      const res = await fetch(`/api/estimates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      })

      const data = await res.json()
      if (res.ok && data.success) {
        toast.success("Presupuesto finalizado correctamente")
        router.refresh()
      } else {
        toast.error(data.error || "Error al finalizar el presupuesto")
      }
    } catch (error) {
      console.error(error)
      toast.error("Error de red al procesar la solicitud")
    } finally {
      setIsLoading(null)
    }
  }

  const filteredEstimates = initialEstimates.filter((est) => {
    const matchesTab = est.status === activeTab
    const matchesSearch =
      est.service?.observation?.toLowerCase().includes(search.toLowerCase()) ||
      est.service?.client?.name?.toLowerCase().includes(search.toLowerCase()) ||
      est.description?.toLowerCase().includes(search.toLowerCase())

    return matchesTab && matchesSearch
  })

  return (
    <Card className="shadow-sm border-muted">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs
            defaultValue="PENDING"
            value={activeTab}
            onValueChange={(val) =>
              setActiveTab(val as "PENDING" | "COMPLETED")
            }
            className="w-full sm:w-auto"
          >
            <TabsList className="grid w-full grid-cols-2 sm:w-[280px]">
              <TabsTrigger value="PENDING" className="text-xs sm:text-sm">
                Pendientes
              </TabsTrigger>
              <TabsTrigger value="COMPLETED" className="text-xs sm:text-sm">
                Finalizados
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full sm:w-[260px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por servicio, cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border border-neutral-100 dark:border-neutral-800 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-[120px]">Fecha</TableHead>
                <TableHead>Servicio / OT</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead className="w-[150px] text-center">Estado</TableHead>
                <TableHead className="w-[120px] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEstimates.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-12 text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <ClipboardList className="h-8 w-8 text-neutral-300" />
                      <p className="text-sm">
                        No se encontraron presupuestos en esta pestaña.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredEstimates.map((est) => (
                  <TableRow key={est.id} className="hover:bg-muted/30">
                    <TableCell className="text-sm font-medium">
                      {formatDate(est.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">
                          {est.service?.observation}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          OT-
                          {String(est.service?.orderNumber ?? "").padStart(
                            6,
                            "0",
                          )}
                        </span>
                        {est.description && (
                          <span className="text-xs text-muted-foreground truncate max-w-[280px]">
                            {est.description}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {est.service?.client ? (
                          <Link
                            href={`/admin/clients/${est.service?.client.id}`}
                            className="text-primary hover:underline font-medium"
                          >
                            {est.service?.client.name}
                          </Link>
                        ) : (
                          <span className="text-muted-foreground">
                            Sin cliente
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-bold text-foreground">
                      {formatCurrency(est.amount)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={
                          est.status === "PENDING"
                            ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50"
                        }
                        variant="outline"
                      >
                        {est.status === "PENDING" ? "Pendiente" : "Finalizado"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {est.status === "PENDING" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs gap-1 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 dark:border-emerald-900 dark:hover:bg-emerald-950/20"
                            onClick={() => handleFinalize(est.id)}
                            disabled={isLoading === est.id}
                          >
                            <CheckCircle className="h-3.5 w-3.5" />
                            Finalizar
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          asChild
                        >
                          <Link href={`/admin/estimates/${est.id}`}>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
