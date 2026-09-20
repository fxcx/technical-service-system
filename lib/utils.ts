import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ServiceStatus, PaymentMethod } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Temporal Helpers ─────────────────────────────────────────────────────────
// Prisma 8 usa Temporal.Instant para columnas timestamptz.
// Estos helpers centralizan la conversión para no importar Temporal en cada archivo.

/** Convierte Date o string ISO a Temporal.Instant (lo que Prisma 8 espera para timestamptz) */
export function toInstant(date: Date | string): Temporal.Instant {
  const d = typeof date === "string" ? new Date(date) : date;
  return Temporal.Instant.fromEpochMilliseconds(d.getTime());
}

/** Temporal.Instant de "ahora" */
export function nowInstant(): Temporal.Instant {
  return Temporal.Now.instant();
}

/** Inicio del día como Temporal.Instant */
export function startOfDayInstant(date?: Date): Temporal.Instant {
  const d = new Date(date ?? Date.now());
  d.setHours(0, 0, 0, 0);
  return Temporal.Instant.fromEpochMilliseconds(d.getTime());
}

/** Fin del día como Temporal.Instant */
export function endOfDayInstant(date?: Date): Temporal.Instant {
  const d = new Date(date ?? Date.now());
  d.setHours(23, 59, 59, 999);
  return Temporal.Instant.fromEpochMilliseconds(d.getTime());
}

/** Primer día del mes como Temporal.Instant */
export function startOfMonthInstant(date?: Date): Temporal.Instant {
  const d = date ?? new Date();
  return toInstant(new Date(d.getFullYear(), d.getMonth(), 1));
}

/** Último día del mes como Temporal.Instant */
export function endOfMonthInstant(date?: Date): Temporal.Instant {
  const d = date ?? new Date();
  const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  return Temporal.Instant.fromEpochMilliseconds(end.getTime());
}

/** Convierte Temporal.Instant / string / Date a Date JS (para formatear en UI) */
export function toDate(value: Temporal.Instant | string | Date): Date {
  if (value instanceof Date) return value;
  if (typeof value === "string") return new Date(value);
  return new Date(value.epochMilliseconds);
}

// ─── Formateo ─────────────────────────────────────────────────────────────────

export function formatCurrency(
  amount: number | string | { toNumber: () => number } | null | undefined
): string {
  if (amount === null || amount === undefined) return "$0";

  let numAmount: number;
  if (typeof amount === "number") {
    numAmount = amount;
  } else if (typeof amount === "string") {
    numAmount = parseFloat(amount) || 0;
  } else if (typeof amount === "object" && "toNumber" in amount) {
    numAmount = amount.toNumber();
  } else {
    numAmount = 0;
  }

  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(numAmount);
}

export function formatDate(date: Date | string | Temporal.Instant): string {
  const d = toDate(date);
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function formatDateTime(date: Date | string | Temporal.Instant): string {
  const d = toDate(date);
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function formatTime(time: string | Date | Temporal.Instant): string {
  if (typeof time === "string" && /^\d{1,2}:\d{2}/.test(time)) {
    const [hours, minutes] = time.split(":");
    const hour = Number.parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }

  const d = toDate(time);
  return new Intl.DateTimeFormat("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function getStatusLabel(status: ServiceStatus): string {
  const labels: Record<ServiceStatus, string> = {
    PENDING: "Pendiente",
    IN_PROGRESS: "En Curso",
    COMPLETED: "Completado",
    CANCELLED: "Cancelado",
    CLOSED: "Finalizado",
  };
  return labels[status];
}

export function getStatusColor(status: ServiceStatus): string {
  const colors: Record<ServiceStatus, string> = {
    PENDING: "bg-amber-100 text-amber-800",
    IN_PROGRESS: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-emerald-100 text-emerald-800",
    CANCELLED: "bg-neutral-100 text-neutral-800",
    CLOSED: "bg-neutral-100 text-neutral-800",
  };
  return colors[status];
}

export function getPaymentMethodLabel(method: PaymentMethod): string {
  const labels: Record<PaymentMethod, string> = {
    CASH: "Efectivo",
    TRANSFER: "Transferencia",
    CARD: "Tarjeta",
    OTHER: "Otro",
  };
  return labels[method];
}

export function isToday(date: Date | string | Temporal.Instant): boolean {
  const d = toDate(date);
  const today = new Date();
  return d.toDateString() === today.toDateString();
}

export function isTomorrow(date: Date | string | Temporal.Instant): boolean {
  const d = toDate(date);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return d.toDateString() === tomorrow.toDateString();
}

export function getRelativeDay(date: Date | string | Temporal.Instant): string {
  if (isToday(date)) return "Hoy";
  if (isTomorrow(date)) return "Mañana";
  return formatDate(date);
}

export function serialize<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj !== "object") {
    return obj;
  }

  // Handle Date
  if (obj instanceof Date) {
    return obj.toISOString() as unknown as T;
  }

  // Handle Temporal.Instant
  if (typeof Temporal !== "undefined" && obj instanceof Temporal.Instant) {
    return obj.toString() as unknown as T;
  }

  // Handle Decimal
  if (
    //@ts-ignore
    typeof obj.toNumber === "function" &&
    //@ts-ignore
    typeof obj.toFixed === "function"
  ) {
    //@ts-ignore
    return obj.toNumber();
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => serialize(item)) as unknown as T;
  }

  const newObj: Record<string, unknown> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = serialize((obj as Record<string, unknown>)[key]);
    }
  }

  return newObj as T;
}
