import { getAccessToken } from "@/lib/auth/token-storage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_API_BASE_URL environment variable');
}

interface RequestOptions extends RequestInit {
  authenticated?: boolean;
}

export async function apiRequest<TResponse>(
  path: string,
  options: RequestOptions = {},
): Promise<TResponse> {
  const { authenticated = false, headers, ...requestOptions } = options;

  const requestHeaders = new Headers(headers);
  requestHeaders.set('Content-Type', 'application/json');

  if (authenticated) {
    const token = getAccessToken();

    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`);
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers: requestHeaders,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw new Error(
      typeof errorBody?.message === 'string'
        ? errorBody.message
        : 'Unexpected API error',
    );
  }

  return response.json() as Promise<TResponse>;
}