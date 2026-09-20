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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate, formatCurrency, getPaymentMethodLabel } from "@/lib/utils";
import {
  DollarSign,
  Calendar,
  CheckCircle,
  Loader2,
  AlertCircle,
  User,
} from "lucide-react";
import type { Payment, User as UserType } from "@/types";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from "date-fns";

interface PaymentsTableProps {
  payments: Payment[];
  technicians: UserType[];
}

interface PaymentState {
  amountPaid: number;
  debtAmount: number;
  hasDebt: boolean;
}

export function PaymentsTable({ payments, technicians }: PaymentsTableProps) {
  const [technicianFilter, setTechnicianFilter] = useState<string>("ALL");
  const [timeFilter, setTimeFilter] = useState<string>("ALL");
  // Track local state overrides per payment id
  const [localPaymentState, setLocalPaymentState] = useState<
    Record<string, PaymentState>
  >({});
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Modal state for partial payment
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [partialAmount, setPartialAmount] = useState("");

  const filteredPayments = payments.filter((payment) => {
    const matchesTechnician =
      technicianFilter === "ALL" || payment.technicianId === technicianFilter;

    let matchesTime = true;
    const paymentDate = new Date(payment.createdAt);
    const now = new Date();

    if (timeFilter === "WEEK") {
      matchesTime = isWithinInterval(paymentDate, {
        start: startOfWeek(now, { weekStartsOn: 1 }),
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

  // Get effective state (local override or original)
  function getEffectiveState(payment: Payment): PaymentState {
    if (localPaymentState[payment.id]) return localPaymentState[payment.id];
    return {
      amountPaid: Number(payment.amountPaid),
      debtAmount: Number(payment.debtAmount || 0),
      hasDebt: Boolean((Number(payment.debtAmount) > 0)) && Number(payment.debtAmount || 0) > 0,
    };
  }

  const totalAmount = filteredPayments.reduce(
    (sum, p) => sum + getEffectiveState(p).amountPaid,
    0,
  );

  const totalDebt = filteredPayments.reduce((sum, p) => {
    const state = getEffectiveState(p);
    return sum + (state.hasDebt ? state.debtAmount : 0);
  }, 0);

  function openSettleModal(payment: Payment) {
    setSelectedPayment(payment);
    setPartialAmount("");
  }

  function closeSettleModal() {
    setSelectedPayment(null);
    setPartialAmount("");
  }

  async function handleSettleDebt(settleAll = false) {
    if (!selectedPayment) return;

    const currentState = getEffectiveState(selectedPayment);
    const additional = settleAll
      ? currentState.debtAmount
      : Number.parseFloat(partialAmount);

    if (!settleAll && (isNaN(additional) || additional <= 0)) return;
    if (!settleAll && additional > currentState.debtAmount) return;

    setLoadingId(selectedPayment.id);
    try {
      const res = await fetch(`/api/payments/${selectedPayment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          settleAll
            ? { debtAmount: 0, hasDebt: false }
            : { additionalPayment: additional },
        ),
      });

      if (res.ok) {
        const newDebt = Math.max(0, currentState.debtAmount - additional);
        setLocalPaymentState((prev) => ({
          ...prev,
          [selectedPayment.id]: {
            amountPaid: currentState.amountPaid + additional,
            debtAmount: newDebt,
            hasDebt: newDebt > 0,
          },
        }));
        closeSettleModal();
      }
    } catch (err) {
      console.error("Error settling debt:", err);
    } finally {
      setLoadingId(null);
    }
  }

  // Projected debt after partial payment
  const partialValue = Number.parseFloat(partialAmount) || 0;
  const selectedState = selectedPayment
    ? getEffectiveState(selectedPayment)
    : null;
  const projectedDebt = selectedState
    ? Math.max(0, selectedState.debtAmount - partialValue)
    : 0;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 flex-wrap">
                <DollarSign className="h-5 w-5" />
                {filteredPayments.length} cobros — Total cobrado:{" "}
                <span className="text-emerald-600">
                  {formatCurrency(totalAmount)}
                </span>
                {totalDebt > 0 && (
                  <span className="flex items-center gap-1 text-red-500 text-sm font-normal ml-1">
                    <AlertCircle className="h-4 w-4" />
                    Deuda pendiente: {formatCurrency(totalDebt)}
                  </span>
                )}
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
                  <TableHead>
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      Cliente
                    </span>
                  </TableHead>
                  <TableHead>Técnico</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead className="text-right">Cobrado</TableHead>
                  <TableHead className="text-right">Deuda</TableHead>
                  <TableHead className="text-right">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No se encontraron cobros
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map((payment) => {
                    const state = getEffectiveState(payment);
                    const hasDebt = state.hasDebt && state.debtAmount > 0;
                    const isLoading = loadingId === payment.id;
                    // @ts-ignore - client included via nested relation
                    const clientName = payment.service?.client?.name;

                    return (
                      <TableRow
                        key={payment.id}
                        className={
                          hasDebt ? "bg-red-50/40 dark:bg-red-950/10" : ""
                        }
                      >
                        <TableCell className="text-sm">
                          {formatDate(payment.createdAt)}
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`/admin/services/${payment.serviceId}`}
                            className="text-primary hover:underline text-sm"
                          >
                            {payment.service?.observation}
                          </Link>
                        </TableCell>
                        <TableCell className="text-sm">
                          {clientName ? (
                            <span className="font-medium">{clientName}</span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">
                          {payment.technician?.name}
                        </TableCell>
                        <TableCell className="text-sm">
                          {getPaymentMethodLabel(payment.method)}
                        </TableCell>
                        <TableCell className="text-right font-medium text-emerald-600">
                          {formatCurrency(state.amountPaid)}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {hasDebt ? (
                            <span className="text-red-600 font-semibold">
                              {formatCurrency(state.debtAmount)}
                            </span>
                          ) : (
                            <span className="text-muted-foreground text-sm">
                              {localPaymentState[payment.id]
                                ? "✓ Saldado"
                                : "—"}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {hasDebt ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-emerald-600 border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                              disabled={isLoading}
                              onClick={() => openSettleModal(payment)}
                            >
                              {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <CheckCircle className="h-4 w-4 mr-1" />
                              )}
                              Registrar pago
                            </Button>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              {localPaymentState[payment.id]
                                ? "✓ Saldado"
                                : (Number(payment.debtAmount) > 0) === false
                                  ? "—"
                                  : "✓ Al día"}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal para registrar pago de deuda */}
      <Dialog
        open={!!selectedPayment}
        onOpenChange={(open) => !open && closeSettleModal()}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Registrar pago de deuda</DialogTitle>
            <DialogDescription>
              {selectedPayment && (
                <>
                  Cliente:{" "}
                  <strong>
                    {/* @ts-ignore */}
                    {selectedPayment.service?.client?.name || "Sin cliente"}
                  </strong>
                  {" — "}Servicio:{" "}
                  <strong>{selectedPayment.service?.observation}</strong>
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedState && (
            <div className="space-y-4 py-2">
              {/* Resumen actual */}
              <div className="grid grid-cols-2 gap-3 rounded-lg border p-3 bg-muted/40 text-sm">
                <div>
                  <p className="text-muted-foreground">Ya cobrado</p>
                  <p className="font-semibold text-emerald-600">
                    {formatCurrency(selectedState.amountPaid)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Deuda actual</p>
                  <p className="font-semibold text-red-600">
                    {formatCurrency(selectedState.debtAmount)}
                  </p>
                </div>
              </div>

              {/* Input monto parcial */}
              <div className="space-y-2">
                <Label htmlFor="partialAmount">
                  ¿Cuánto paga ahora el cliente?
                </Label>
                <Input
                  id="partialAmount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={selectedState.debtAmount}
                  placeholder={`Máx: ${formatCurrency(selectedState.debtAmount)}`}
                  value={partialAmount}
                  onChange={(e) => setPartialAmount(e.target.value)}
                  autoFocus
                />
              </div>

              {/* Proyección */}
              {partialValue > 0 && (
                <div className="rounded-lg border p-3 text-sm space-y-1.5">
                  <p className="font-medium text-muted-foreground">
                    Resultado del pago:
                  </p>
                  <div className="flex justify-between">
                    <span>Total cobrado:</span>
                    <span className="font-semibold text-emerald-600">
                      {formatCurrency(selectedState.amountPaid + partialValue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deuda restante:</span>
                    <span
                      className={
                        projectedDebt === 0
                          ? "font-semibold text-emerald-600"
                          : "font-semibold text-red-600"
                      }
                    >
                      {projectedDebt === 0
                        ? "✓ Saldado"
                        : formatCurrency(projectedDebt)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={closeSettleModal}
              className="flex-1 sm:flex-none"
            >
              Cancelar
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleSettleDebt(false)}
              disabled={
                loadingId !== null ||
                !partialValue ||
                partialValue <= 0 ||
                (selectedState ? partialValue > selectedState.debtAmount : true)
              }
              className="flex-1"
            >
              {loadingId ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Registrar pago parcial
            </Button>
            <Button
              onClick={() => handleSettleDebt(true)}
              disabled={loadingId !== null}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              {loadingId ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              Saldar todo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
