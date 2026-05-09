import { apiRequest } from '@/lib/api/http-client';
import type { CreateOrderPayload, Order } from '@/features/orders/types/order.types';
import { Routes } from '@/lib/utils/routes';

interface GetOrdersQuery {
  dateFrom?: string;
  dateTo?: string;
}

export function createOrder(payload: CreateOrderPayload): Promise<Order> {
  return apiRequest<Order>(Routes.api.orders(), {
    method: 'POST',
    authenticated: true,
    body: JSON.stringify(payload),
  });
}

export function getOrders(query: GetOrdersQuery = {}): Promise<Order[]> {
  const searchParams = new URLSearchParams();

  if (query.dateFrom) {
    searchParams.set('dateFrom', query.dateFrom);
  }

  if (query.dateTo) {
    searchParams.set('dateTo', query.dateTo);
  }

  const queryString = searchParams.toString();
  const path = queryString
    ? `${Routes.api.orders()}?${queryString}`
    : Routes.api.orders();

  return apiRequest<Order[]>(path, {
    method: 'GET',
    authenticated: true,
  });
}
