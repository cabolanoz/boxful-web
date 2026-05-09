import { apiRequest } from '@/lib/api/http-client';
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from '@/features/auth/types/auth.types';
import { Routes } from '@/lib/utils/routes';

export function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  return apiRequest<AuthResponse>(Routes.api.authRegister(), {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  return apiRequest<AuthResponse>(Routes.api.authLogin(), {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getCurrentUser(): Promise<AuthResponse['user']> {
  return apiRequest<AuthResponse['user']>(Routes.api.authMe(), {
    method: 'GET',
    authenticated: true,
  });
}
