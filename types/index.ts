export interface AppError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: AppError;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type Role = 'user' | 'admin' | 'moderator';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  fullName: string | null;
  role: string;
}

export interface User {
  _id?: string;
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
