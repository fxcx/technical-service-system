import type { ServiceStatus } from "./service";
import type { EstimateStatus } from "./estimate";
import type { SettlementStatus } from "./settlement";

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
  dateFrom?: string;
  dateTo?: string;
}

export interface InventoryItemFilters {
  companyId?: string;
  isActive?: boolean;
  search?: string;
}
