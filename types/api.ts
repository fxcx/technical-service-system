import type { Role } from "./user";

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
