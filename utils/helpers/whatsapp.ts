/**
 * Helper WhatsApp — TechService
 * Genera mensajes para WhatsApp (nunca envía automáticamente).
 * Documentación: docs/whatsapp.md
 */

export interface WhatsAppTemplateVars {
  cliente: string;
  numero: string;
  fecha: string;
  hora: string;
  direccion: string;
  descripcion: string;
  tecnico: string;
  telefono_tecnico?: string;
  empresa?: string;
  telefono_empresa?: string;
  observaciones?: string;
}

const PLANTILLA_DEFAULT = `Hola _{{cliente}}_.

Le confirmamos el servicio técnico.

📌 Orden: {{numero}}
📅 Fecha: {{fecha}}
🕒 Hora: {{hora}}
👨‍🔧 Técnico: {{tecnico}}
📍 Dirección:
{{direccion}}
📝 Motivo:
{{descripcion}}{{observaciones}}

Muchas gracias.`;

/**
 * Genera el texto del mensaje sustituyendo variables en la plantilla.
 */
export function generateWhatsAppMessage(
  vars: WhatsAppTemplateVars,
  plantilla: string = PLANTILLA_DEFAULT,
): string {
  const observacionesBlock = vars.observaciones
    ? `\n\n💬 Observaciones:\n${vars.observaciones}`
    : "";

  return plantilla
    .replace("{{cliente}}", vars.cliente)
    .replace("{{numero}}", vars.numero)
    .replace("{{fecha}}", vars.fecha)
    .replace("{{hora}}", vars.hora)
    .replace("{{tecnico}}", vars.tecnico)
    .replace("{{telefono_tecnico}}", vars.telefono_tecnico ?? "")
    .replace("{{empresa}}", vars.empresa ?? "")
    .replace("{{telefono_empresa}}", vars.telefono_empresa ?? "")
    .replace("{{direccion}}", vars.direccion)
    .replace("{{descripcion}}", vars.descripcion)
    .replace("{{observaciones}}", observacionesBlock);
}

/**
 * Genera la URL para abrir WhatsApp con el mensaje cargado.
 * Valida que el teléfono exista.
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  // Limpiar el número: mantener solo dígitos y el + inicial
  const cleaned = phone.replace(/[^\d+]/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encoded}`;
}
