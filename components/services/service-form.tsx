"use client";

import type React from "react";
import { formatCurrency, toDate } from "@/lib/utils";
import { formatTime } from "@/lib/utils";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Loader2,
  ChevronDown,
  MessageCircle,
  Copy,
  ExternalLink,
} from "lucide-react";
import type { Client, User, Service } from "@/types";
import { ClientSearchInput } from "@/components/clients/client-search-input";
import {
  generateWhatsAppMessage,
  buildWhatsAppUrl,
  type WhatsAppTemplateVars,
} from "@/utils/helpers/whatsapp";

interface ServiceFormProps {
  clients: Client[];
  technicians: User[];
  createdById: string;
  service?: Service;
}

export function ServiceForm({
  clients,
  technicians,
  createdById,
  service,
}: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [clientsList, setClientsList] = useState(clients);

  const [formData, setFormData] = useState({
    title: service?.observation || "",
    description: service?.observation || "",
    clientId: service?.clientId || "",
    technicianId: service?.technicianId || "",
    scheduledDate: service?.scheduledDate
      ? toDate(service.scheduledDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    scheduledTime: service?.scheduledDate || "09:00",
    address: service?.address || "",
    notes: service?.observation || "",
    expectedAmount: service?.expectedAmount
      ? String(service.expectedAmount)
      : "",
  });

  // Ref para la acción post-guardado de WhatsApp
  const whatsappActionRef = useRef<"none" | "copy" | "open">("none");

  function getSelectedClient() {
    return clientsList.find((c) => c.id === formData.clientId);
  }

  function getSelectedTechnician() {
    return technicians.find((t) => t.id === formData.technicianId);
  }

  function buildWhatsAppMsg(serviceId: string): string {
    const client = getSelectedClient();
    const tech = getSelectedTechnician();
    const vars: WhatsAppTemplateVars = {
      cliente: client?.name || "Cliente",
      numero: serviceId.slice(0, 8).toUpperCase(),
      fecha: new Date(`${formData.scheduledDate}T12:00:00`).toLocaleDateString(
        "es-AR",
        {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      ),
      hora: formData.scheduledDate,
      direccion: formData.address || client?.address || "A confirmar",
      descripcion: formData.description || formData.title,
      tecnico: tech?.name || "Sin asignar",
      observaciones: formData.notes || undefined,
    };
    return generateWhatsAppMessage(vars);
  }

  async function handleWhatsAppAction(serviceId: string) {
    const action = whatsappActionRef.current;
    if (action === "none") return;

    const client = getSelectedClient();
    const message = buildWhatsAppMsg(serviceId);

    try {
      if (action === "copy") {
        await navigator.clipboard.writeText(message);
        toast.success("Mensaje WhatsApp copiado al portapapeles");
      } else if (action === "open") {
        if (!client?.phone) {
          toast.error("El cliente no tiene teléfono registrado");
          return;
        }
        const url = buildWhatsAppUrl(client.phone, message);
        window.open(url, "_blank");
      }
      // Log la acción
      await fetch("/api/integrations/whatsapp/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          action: action === "copy" ? "COPIED" : "OPENED",
        }),
      });
    } catch {
      // No bloquear la UX por el log
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const url = service ? `/api/services/${service.id}` : "/api/services";
      const method = service ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          scheduledDate: new Date(`${formData.scheduledDate}T12:00:00`),
          expectedAmount: formData.expectedAmount
            ? Number.parseFloat(formData.expectedAmount)
            : null,
          createdById,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al guardar");
      }

      const result = await res.json();
      const savedServiceId = result.data?.id || service?.id;

      // Ejecutar acción WhatsApp si corresponde
      if (savedServiceId) {
        await handleWhatsAppAction(savedServiceId);
      }

      toast.success(service ? "Servicio actualizado" : "Servicio creado");
      router.push("/admin/services");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al guardar el servicio",
      );
    } finally {
      setLoading(false);
      whatsappActionRef.current = "none";
    }
  }

  function handleClientCreated(newClient: Client) {
    setClientsList([...clientsList, newClient]);
    setFormData({ ...formData, clientId: newClient.id });
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            {service ? "Editar Servicio" : "Datos del Servicio"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título del servicio *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Ej: Instalación aire acondicionado"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Detalles del trabajo a realizar..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Cliente *</Label>
              <ClientSearchInput
                clients={clientsList}
                value={formData.clientId}
                onClientSelected={(id) =>
                  setFormData({ ...formData, clientId: id })
                }
                onClientCreated={handleClientCreated}
              />
              {!formData.clientId && (
                <p className="text-[0.8rem] text-muted-foreground">
                  Escribe al menos 2 caracteres para buscar un cliente existente
                  o crear uno nuevo.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Técnico asignado</Label>
              <Select
                value={formData.technicianId}
                onValueChange={(v) =>
                  setFormData({ ...formData, technicianId: v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar técnico (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  {technicians.map((tech) => (
                    <SelectItem key={tech.id} value={tech.id}>
                      {tech.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scheduledDate">Fecha *</Label>
                <Input
                  id="scheduledDate"
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) =>
                    setFormData({ ...formData, scheduledDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduledTime">Hora *</Label>
                <Input
                  id="scheduledTime"
                  type="time"
                  value={formData.scheduledDate}
                  onChange={(e) =>
                    setFormData({ ...formData, scheduledTime: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección del servicio</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Dirección donde se realizará el servicio"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedAmount">Monto esperado ($)</Label>
              <Input
                id="expectedAmount"
                type="number"
                step="0.01"
                value={formData.expectedAmount}
                onChange={(e) =>
                  setFormData({ ...formData, expectedAmount: e.target.value })
                }
                placeholder="Ej: 5000"
              />
              <p className="text-xs text-muted-foreground">
                Monto que se espera cobrar por este servicio.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas internas</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Notas adicionales..."
                rows={2}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={loading}
                onClick={() => {
                  whatsappActionRef.current = "none";
                }}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {service ? "Guardar Cambios" : "Guardar"}
              </Button>
              {!service && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={loading}
                      className="gap-1 text-green-700 border-green-200 hover:bg-green-50"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        whatsappActionRef.current = "copy";
                        const form = document.querySelector("form");
                        if (form) form.requestSubmit();
                      }}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Guardar y Copiar WhatsApp
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        whatsappActionRef.current = "open";
                        const form = document.querySelector("form");
                        if (form) form.requestSubmit();
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Guardar y Abrir WhatsApp
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
