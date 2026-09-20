"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { MessageCircle, Copy, ExternalLink } from "lucide-react";
import {
  generateWhatsAppMessage,
  buildWhatsAppUrl,
  type WhatsAppTemplateVars,
} from "@/utils/helpers/whatsapp";

interface WhatsAppActionsProps {
  serviceId: string;
  clientName: string;
  clientPhone?: string | null;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  description: string;
  technicianName: string;
  notes?: string | null;
  /** Render as icon-only button (for compact views like calendar) */
  compact?: boolean;
}

/**
 * Componente reutilizable de acciones WhatsApp.
 * Genera el mensaje, permite copiar al portapapeles o abrir WhatsApp,
 * y registra la acción en IntegrationLog.
 */
export function WhatsAppActions({
  serviceId,
  clientName,
  clientPhone,
  scheduledDate,
  scheduledTime,
  address,
  description,
  technicianName,
  notes,
  compact = false,
}: WhatsAppActionsProps) {
  const [loading, setLoading] = useState(false);

  function buildMessage(): string {
    const vars: WhatsAppTemplateVars = {
      cliente: clientName,
      numero: serviceId.slice(0, 8).toUpperCase(),
      fecha: new Date(scheduledDate).toLocaleDateString("es-AR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      hora: scheduledTime,
      direccion: address || "A confirmar",
      descripcion: description || "Servicio técnico",
      tecnico: technicianName,
      observaciones: notes || undefined,
    };
    return generateWhatsAppMessage(vars);
  }

  async function logAction(action: "COPIED" | "OPENED") {
    try {
      await fetch("/api/integrations/whatsapp/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, action }),
      });
    } catch {
      // El logging no debe bloquear la UX
    }
  }

  async function handleCopy() {
    setLoading(true);
    try {
      const message = buildMessage();
      await navigator.clipboard.writeText(message);
      toast.success("Mensaje copiado al portapapeles");
      await logAction("COPIED");
    } catch {
      toast.error("No se pudo copiar el mensaje");
    } finally {
      setLoading(false);
    }
  }

  async function handleOpen() {
    if (!clientPhone) {
      toast.error("El cliente no tiene teléfono registrado");
      return;
    }
    setLoading(true);
    try {
      const message = buildMessage();
      const url = buildWhatsAppUrl(clientPhone, message);
      window.open(url, "_blank");
      await logAction("OPENED");
    } catch {
      toast.error("No se pudo abrir WhatsApp");
    } finally {
      setLoading(false);
    }
  }

  if (compact) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="inline-flex items-center justify-center rounded-md p-1 text-green-600 hover:bg-green-50 transition-colors"
            title="WhatsApp"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageCircle className="h-3.5 w-3.5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem onClick={handleCopy} disabled={loading}>
            <Copy className="mr-2 h-4 w-4" />
            Copiar mensaje
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleOpen}
            disabled={loading || !clientPhone}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Abrir WhatsApp
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={loading}>
          <MessageCircle className="mr-2 h-4 w-4 text-green-600" />
          WhatsApp
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCopy} disabled={loading}>
          <Copy className="mr-2 h-4 w-4" />
          Copiar mensaje
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleOpen}
          disabled={loading || !clientPhone}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Abrir WhatsApp
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
