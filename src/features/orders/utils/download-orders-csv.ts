import type { Order } from '@/features/orders/types/order.types';

const csvHeaders = [
  'No. de orden',
  'Nombre',
  'Apellidos',
  'Departamento',
  'Municipio',
  'Paquetes en orden',
];

const escapeCsvValue = (value: string | number) => {
  const stringValue = String(value);

  return `"${stringValue.replaceAll('"', '""')}"`;
};

export function downloadOrdersCsv(orders: Order[]) {
  const rows = orders.map((order) => [
    order.trackingCode,
    order.recipient.firstName,
    order.recipient.lastName,
    order.recipient.department,
    order.recipient.municipality,
    order.packages.length,
  ]);
  const csvContent = [csvHeaders, ...rows]
    .map((row) => row.map(escapeCsvValue).join(','))
    .join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = 'ordenes.csv';
  link.click();
  URL.revokeObjectURL(url);
}
