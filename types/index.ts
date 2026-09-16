import type { FieldOutputTypes } from "@/generated/prisma8/contract";

// ─── Tipos base (filas planas del ORM) ────────────────────────────────────────

export type UserRow = FieldOutputTypes["public"]["User"];
export type ClientRow = FieldOutputTypes["public"]["Client"];
export type CompanyRow = FieldOutputTypes["public"]["Company"];
export type ServiceRow = FieldOutputTypes["public"]["Service"];
export type ServiceCategoryRow = FieldOutputTypes["public"]["ServiceCategory"];
export type PaymentRow = FieldOutputTypes["public"]["Payment"];
export type EstimateRow = FieldOutputTypes["public"]["Estimate"];
export type SettlementRow = FieldOutputTypes["public"]["Settlement"];
export type SettlementItemRow = FieldOutputTypes["public"]["SettlementItem"];
export type SettlementPartRow = FieldOutputTypes["public"]["SettlementPart"];
export type ServicePartRow = FieldOutputTypes["public"]["ServicePart"];
export type InventoryItemRow = FieldOutputTypes["public"]["InventoryItem"];
export type ActivityLogRow = FieldOutputTypes["public"]["ActivityLog"];

// ─── Enums ────────────────────────────────────────────────────────────────────

export type Role = UserRow["role"];
export type ServiceStatus = ServiceRow["status"];
export type PaymentMethod = PaymentRow["method"];
export type EstimateStatus = EstimateRow["status"];
export type SettlementStatus = SettlementRow["status"];

// ─── Tipos con relaciones (para uso en la UI / API) ───────────────────────────

export type User = UserRow;

export type Client = ClientRow & {
  services?: Service[];
};

export type Company = CompanyRow & {
  services?: Service[];
  inventoryItems?: InventoryItem[];
  settlements?: Settlement[];
};

export type ServiceCategory = ServiceCategoryRow & {
  services?: Service[];
};

export type InventoryItem = InventoryItemRow & {
  company?: Company | null;
  serviceParts?: ServicePart[];
};

export type ServicePart = ServicePartRow & {
  service?: Service | null;
  inventoryItem?: InventoryItem | null;
};

export type ActivityLog = ActivityLogRow & {
  service?: Service | null;
  user?: User | null;
};

export type Estimate = EstimateRow & {
  service?: Service | null;
};

export type Payment = PaymentRow & {
  service?: Service | null;
  technician?: User | null;
  settlement?: Settlement | null;
  settlementItems?: SettlementItem[];
};

export type Service = ServiceRow & {
  company?: Company | null;
  client?: Client | null;
  category?: ServiceCategory | null;
  technician?: User | null;
  createdBy?: User | null;
  closedBy?: User | null;
  payment?: Payment | null;
  estimate?: Estimate | null;
  parts?: ServicePart[];
  settlementItems?: SettlementItem[];
  settlementParts?: SettlementPart[];
  activityLogs?: ActivityLog[];
};

export type SettlementItem = SettlementItemRow & {
  settlement?: Settlement | null;
  service?: Service | null;
  payment?: Payment | null;
};

export type SettlementPart = SettlementPartRow & {
  settlement?: Settlement | null;
  service?: Service | null;
  company?: Company | null;
};

export type Settlement = SettlementRow & {
  technician?: User | null;
  liquidatedBy?: User | null;
  company?: Company | null;
  payments?: Payment[];
  items?: SettlementItem[];
  parts?: SettlementPart[];
};

// ─── API Types ────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  avatar?: string | null;
}

// ─── Filter types ─────────────────────────────────────────────────────────────

export interface ServiceFilters {
  status?: ServiceStatus;
  technicianId?: string;
  clientId?: string;
  companyId?: string;
  categoryId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface PaymentFilters {
  technicianId?: string;
  dateFrom?: string;
  dateTo?: string;
  weekNumber?: number;
  year?: number;
}

export interface EstimateFilters {
  status?: EstimateStatus;
  technicianId?: string;
}

export interface SettlementFilters {
  technicianId?: string;
  companyId?: string;
  weekNumber?: number;
  year?: number;
  status?: SettlementStatus;
}

export interface InventoryItemFilters {
  companyId?: string;
  isActive?: boolean;
  search?: string;
}
