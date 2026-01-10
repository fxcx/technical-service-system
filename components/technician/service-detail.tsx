"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  formatTime,
  formatDate,
  getStatusLabel,
  getStatusColor,
  formatCurrency,
} from "@/lib/utils";
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  ArrowLeft,
  Play,
  CheckCircle,
  Loader2,
  Camera,
  X,
} from "lucide-react";
import type { Service, PaymentMethod, PaymentType } from "@/types";

interface ServiceDetailProps {
  service: Service;
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  const router = useRouter();
  const [status, setStatus] = useState(service.status);
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // Payment form state
  const [paymentType, setPaymentType] = useState<PaymentType>("ON_SITE");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");
  const [amount, setAmount] = useState("");
  const [debtAmount, setDebtAmount] = useState("");
  const [receiptPhoto, setReceiptPhoto] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  // Handle receipt photo selection
  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function removePhoto() {
    setReceiptPhoto(null);
    setReceiptPreview(null);
  }

  const canStart = status === "PENDING";
  const canComplete = status === "IN_PROGRESS";
  const isCompleted = status === "COMPLETED";

  async function handleStatusChange(newStatus: "IN_PROGRESS" | "COMPLETED") {
    if (newStatus === "COMPLETED") {
      setShowPayment(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/services/${service.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Error al actualizar estado");

      setStatus(newStatus);
      toast.success("Servicio iniciado");
      router.refresh();
    } catch {
      toast.error("Error al actualizar el servicio");
    } finally {
      setLoading(false);
    }
  }

  async function handleCompleteWithPayment(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // First update status
      const statusRes = await fetch(`/api/services/${service.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "COMPLETED" }),
      });

      if (!statusRes.ok) throw new Error("Error al completar servicio");

      // Upload receipt photo if provided
      let receiptPhotoUrl: string | null = null;
      if (receiptPhoto) {
        const formData = new FormData();
        formData.append("file", receiptPhoto);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          receiptPhotoUrl = uploadData.url;
        }
      }

      // Then register payment if amount > 0
      if (amount && Number.parseFloat(amount) > 0) {
        const paymentRes = await fetch("/api/payments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceId: service.id,
            amount: Number.parseFloat(amount) || 0,
            debtAmount: Number.parseFloat(debtAmount) || 0,
            hasDebt: paymentType === "MANUAL",
            method: paymentMethod,
            paymentType,
            technicianId: service.technicianId,
            receiptPhotoUrl,
          }),
        });

        if (!paymentRes.ok) throw new Error("Error al registrar pago");
      }

      setStatus("COMPLETED");
      setShowPayment(false);
      toast.success(
        "Servicio completado" + (amount ? " y pago registrado" : "")
      );
      router.refresh();
    } catch {
      toast.error("Error al completar el servicio");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/technician/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a agenda
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.client?.name}</CardDescription>
            </div>
            <Badge className={getStatusColor(status)} variant="secondary">
              {getStatusLabel(status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {service.description && (
            <div>
              <h4 className="font-medium mb-1">Descripción</h4>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </div>
          )}

          <Separator />

          <div className="grid gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>
                {formatDate(service.scheduledDate)} -{" "}
                {formatTime(service.scheduledTime)}
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span>{service.client?.address}</span>
            </div>
            {service.client?.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`tel:${service.client.phone}`}
                  className="text-primary hover:underline"
                >
                  {service.client.phone}
                </a>
              </div>
            )}
          </div>

          {service.client?.notes && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-1">Notas del cliente</h4>
                <p className="text-sm text-muted-foreground">
                  {service.client.notes}
                </p>
              </div>
            </>
          )}

          {service.payment && (
            <>
              <Separator />
              <div className="rounded-lg bg-emerald-50 p-3">
                <h4 className="font-medium text-emerald-800 mb-1">
                  Pago registrado
                </h4>
                <p className="text-lg font-bold text-emerald-700">
                  {formatCurrency(service.payment.amountPaid)}
                </p>
                {Number(service.payment.debtAmount) > 0 && (
                  <p className="text-sm text-red-600 font-medium">
                    Deuda pendiente:{" "}
                    {formatCurrency(service.payment.debtAmount)}
                  </p>
                )}
              </div>
            </>
          )}

          {!isCompleted && (
            <>
              <Separator />
              <div className="flex gap-2">
                {service.client?.address && (
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    asChild
                  >
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        service.client.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation className="mr-2 h-4 w-4" />
                      Navegar
                    </a>
                  </Button>
                )}

                {canStart && (
                  <Button
                    className="flex-1"
                    onClick={() => handleStatusChange("IN_PROGRESS")}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="mr-2 h-4 w-4" />
                    )}
                    Iniciar Servicio
                  </Button>
                )}

                {canComplete && (
                  <Button
                    className="flex-1"
                    onClick={() => handleStatusChange("COMPLETED")}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle className="mr-2 h-4 w-4" />
                    )}
                    Completar
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Payment Modal */}
      {showPayment && (
        <Card>
          <CardHeader>
            <CardTitle>Registrar Cobro</CardTitle>
            <CardDescription>
              Ingresa los detalles del pago (opcional si no hubo cobro)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCompleteWithPayment} className="space-y-4">
              <div className="space-y-2">
                <Label>Tipo de cobro</Label>
                <RadioGroup
                  value={paymentType}
                  onValueChange={(v) => setPaymentType(v as PaymentType)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ON_SITE" id="on_site" />
                    <Label htmlFor="on_site" className="font-normal">
                      En el momento
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="MANUAL" id="manual" />
                    <Label htmlFor="manual" className="font-normal">
                      Pago Pendiente (Deuda)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Monto pagado hoy</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Monto que el cliente entrega ahora
                </p>
              </div>

              {paymentType === "MANUAL" && (
                <div className="space-y-2">
                  <Label htmlFor="debtAmount" className="text-red-600">
                    Monto adeudado (Deuda)
                  </Label>
                  <Input
                    id="debtAmount"
                    type="number"
                    step="0.01"
                    placeholder="0"
                    value={debtAmount}
                    onChange={(e) => setDebtAmount(e.target.value)}
                    className="border-red-200"
                  />
                  <p className="text-xs text-muted-foreground">
                    Lo que el cliente queda debiendo
                  </p>
                </div>
              )}

              {amount && Number.parseFloat(amount) > 0 && (
                <div className="space-y-2">
                  <Label>Método de pago</Label>
                  <Select
                    value={paymentMethod}
                    onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CASH">Efectivo</SelectItem>
                      <SelectItem value="TRANSFER">Transferencia</SelectItem>
                      <SelectItem value="CARD">Tarjeta</SelectItem>
                      <SelectItem value="OTHER">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Receipt Photo Upload */}
              <div className="space-y-2">
                <Label>Foto del recibo (opcional)</Label>
                {receiptPreview ? (
                  <div className="relative">
                    <img
                      src={receiptPreview}
                      alt="Preview del recibo"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={removePhoto}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label
                    htmlFor="receiptPhoto"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">
                      Tomar foto o seleccionar
                    </span>
                    <input
                      id="receiptPhoto"
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </label>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowPayment(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="mr-2 h-4 w-4" />
                  )}
                  Completar Servicio
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
