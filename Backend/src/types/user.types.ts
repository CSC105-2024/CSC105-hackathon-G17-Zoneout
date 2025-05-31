import type { Context as HonoContext } from 'hono';

export type Context = HonoContext & {
  user?: {
    id: number;
  };
};

export type CreateUserBody {
  email: string;
  name: string;
  password: string;
  phone: string;
}

export type UserResponse {
  id: number;
  email: string;
  name: string | null;
  phone?: string;
}

export type ApiResponse<T = null> = {
  success: boolean;
  data: T;
  message: string;
} 