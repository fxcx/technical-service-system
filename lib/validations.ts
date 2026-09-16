import { z } from "zod";

// ─── Empresas ────────────────────────────────────────────────────────────────

export const createCompanySchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  logo: z.string().url().optional().nullable(),
  costMarkupPercent: z.number().min(0).optional(),
  defaultMarginPercent: z.number().min(0).optional(),
});

export const updateCompanySchema = createCompanySchema
  .extend({ isActive: z.boolean().optional() })
  .partial();

// ─── Clientes ───────────────────────────────────────────────────────────────

export const createClientSchema = z.object({
  name: z.string().optional().nullable(),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().min(1, "El teléfono es requerido"),
  address: z.string().optional().nullable(),
  locality: z.string().optional().nullable(),
});

export const updateClientSchema = createClientSchema.partial();

// ─── Servicios / Órdenes de Trabajo ─────────────────────────────────────────

export const createServiceSchema = z.object({
  companyId: z.string().uuid("companyId inválido"),
  clientId: z.string().uuid("clientId inválido"),
  categoryId: z.string().uuid("categoryId inválido"),
  technicianId: z.string().uuid().optional().nullable(),
  scheduledDate: z.string().min(1, "La fecha es requerida"),
  address: z.string().min(1, "La dirección es requerida"),
  locality: z.string().min(1, "La localidad es requerida"),
  observation: z.string().optional().nullable(),
  expectedAmount: z.number().min(0).optional().nullable(),
  finalAmount: z.number().min(0).optional(),
});

export const updateServiceSchema = z.object({
  companyId: z.string().uuid().optional(),
  clientId: z.string().uuid().optional(),
  categoryId: z.string().uuid().optional(),
  technicianId: z.string().uuid().optional().nullable(),
  scheduledDate: z.string().optional(),
  address: z.string().optional().nullable(),
  locality: z.string().optional().nullable(),
  observation: z.string().optional().nullable(),
  expectedAmount: z.number().min(0).optional().nullable(),
  finalAmount: z.number().min(0).optional(),
});

export const updateStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
    "CLOSED",
  ]),
});

export const finishServiceSchema = z.object({
  finalAmount: z.number().min(0, "El monto final es requerido"),
  observation: z.string().optional().nullable(),
});

// ─── Cobros ──────────────────────────────────────────────────────────────────

export const createPaymentSchema = z.object({
  serviceId: z.string().uuid("serviceId inválido"),
  technicianId: z.string().uuid("technicianId inválido"),
  method: z.enum(["CASH", "TRANSFER", "CARD", "OTHER"]),
  amountPaid: z.number().min(0, "El monto no puede ser negativo"),
  debtAmount: z.number().min(0).optional(),
});

export const updatePaymentSchema = z.object({
  method: z.enum(["CASH", "TRANSFER", "CARD", "OTHER"]).optional(),
  amountPaid: z.number().min(0).optional(),
  debtAmount: z.number().min(0).optional(),
});

// ─── Repuestos del Servicio ───────────────────────────────────────────────────

export const addServicePartSchema = z.object({
  inventoryItemId: z.string().uuid().optional().nullable(),
  name: z.string().min(1, "El nombre es requerido"),
  nota: z.string().optional().nullable(),
  quantity: z.number().positive("La cantidad debe ser positiva"),
  unitCost: z.number().min(0, "El costo no puede ser negativo"),
  unitSalePrice: z.number().min(0, "El precio de venta no puede ser negativo"),
});

export const updateServicePartSchema = addServicePartSchema
  .omit({ inventoryItemId: true })
  .partial();

// ─── Inventario ───────────────────────────────────────────────────────────────

export const createInventoryItemSchema = z.object({
  companyId: z.string().uuid("companyId inválido"),
  code: z.string().min(1, "El código es requerido"),
  name: z.string().min(1, "El nombre es requerido"),
  unit: z.string().optional().nullable(),
  stock: z.number().int().min(0).optional(),
  costInitList: z.number().min(0),
  costPrice: z.number().min(0),
  sellPrice: z.number().min(0),
  techPrice: z.number().min(0),
  marginPercent: z.number().min(0).optional(),
});

export const updateInventoryItemSchema = createInventoryItemSchema
  .omit({ companyId: true, code: true })
  .extend({ isActive: z.boolean().optional(), code: z.string().optional() })
  .partial();

// ─── Presupuestos ─────────────────────────────────────────────────────────────

export const createEstimateSchema = z.object({
  serviceId: z.string().uuid("serviceId inválido"),
  amount: z.number().positive("El monto debe ser positivo"),
  description: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export const updateEstimateSchema = createEstimateSchema.partial().omit({
  serviceId: true,
});

// ─── Rendiciones ──────────────────────────────────────────────────────────────

export const generateSettlementSchema = z.object({
  technicianId: z.string().uuid("technicianId inválido"),
  companyId: z.string().uuid().optional().nullable(),
  startDate: z.string().min(1, "La fecha de inicio es requerida"),
  endDate: z.string().min(1, "La fecha de fin es requerida"),
  label: z.string().optional().nullable(),
  commissionRate: z.number().min(0).max(1, "La comisión debe ser entre 0 y 1"),
});

// ─── Técnicos ─────────────────────────────────────────────────────────────────

export const createTechnicianSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Contraseña mínimo 6 caracteres"),
  phone: z.string().optional().nullable(),
  dni: z.string().optional().nullable(),
});

export const updateTechnicianSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  phone: z.string().optional().nullable(),
  dni: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  avatar: z.string().url().optional().nullable(),
});
