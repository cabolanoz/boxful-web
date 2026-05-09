import { getOrders } from '@/features/orders/api/orders.api';

export interface SettlementSummary {
  settlementAmount: number;
}

export async function getSettlementSummary(): Promise<SettlementSummary> {
  const orders = await getOrders();

  return {
    settlementAmount: orders.reduce(
      (total, order) => total + (order.settlementAmount ?? 0),
      0,
    ),
  };
}
