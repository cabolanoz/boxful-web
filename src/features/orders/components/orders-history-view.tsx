'use client';

import {
  DownloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, DatePicker, Empty, Spin, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Dayjs } from 'dayjs';
import { useCallback, useEffect, useState, type Key } from 'react';
import { getOrders } from '@/features/orders/api/orders.api';
import type {
  Order,
  OrderStatus,
  PaymentMode,
} from '@/features/orders/types/order.types';
import { downloadOrdersCsv } from '@/features/orders/utils/download-orders-csv';
import { formatCurrency } from '@/features/orders/utils/format-currency';

const { RangePicker } = DatePicker;

const getPaymentModeTag = (paymentMode: PaymentMode) => {
  if (paymentMode === 'COD') {
    return <Tag color="red" className="m-0 whitespace-nowrap">PCE</Tag>;
  }

  return <Tag color="blue" className="m-0 whitespace-nowrap">Estándar</Tag>;
};

const getOrderStatusTag = (status: OrderStatus) => {
  const statusMap: Record<
    OrderStatus,
    { color: string; label: string }
  > = {
    PENDING: { color: 'gold', label: 'Pendiente' },
    IN_TRANSIT: { color: 'blue', label: 'En tránsito' },
    DELIVERED: { color: 'green', label: 'Entregada' },
    CANCELLED: { color: 'red', label: 'Cancelada' },
  };
  const statusConfig = statusMap[status];

  return (
    <Tag color={statusConfig.color} className="m-0 whitespace-nowrap">
      {statusConfig.label}
    </Tag>
  );
};

const getBoxfulRevenue = (order: Order) =>
  (order.shippingCost ?? 0) + (order.codCommission ?? 0);

export function OrdersHistoryView() {
  const [messageApi, contextHolder] = message.useMessage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);

  const loadOrders = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await getOrders(
        dateRange
          ? {
              dateFrom: dateRange[0].startOf('month').format('YYYY-MM-DD'),
              dateTo: dateRange[1].endOf('month').format('YYYY-MM-DD'),
            }
          : undefined,
      );

      setOrders(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'No se pudo cargar el historial de órdenes';

      messageApi.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange, messageApi]);

  useEffect(() => {
    queueMicrotask(() => {
      void loadOrders();
    });
  }, [loadOrders]);

  const handleDownloadOrders = () => {
    const selectedOrders = orders.filter((order) =>
      selectedRowKeys.includes(order.id),
    );

    if (selectedOrders.length === 0) {
      messageApi.info('Selecciona al menos una orden para descargar');
      return;
    }

    downloadOrdersCsv(selectedOrders);
  };

  const columns: ColumnsType<Order> = [
    {
      title: <span className="whitespace-nowrap">No. de orden</span>,
      dataIndex: 'trackingCode',
      key: 'trackingCode',
      width: 150,
      render: (trackingCode: string) => (
        <span className="whitespace-nowrap">{trackingCode}</span>
      ),
    },
    {
      title: 'Nombre',
      key: 'firstName',
      width: 120,
      render: (_, order) => (
        <span className="whitespace-nowrap">{order.recipient.firstName}</span>
      ),
    },
    {
      title: 'Apellidos',
      key: 'lastName',
      width: 140,
      render: (_, order) => (
        <span className="whitespace-nowrap">{order.recipient.lastName}</span>
      ),
    },
    {
      title: 'Departamento',
      key: 'department',
      width: 140,
      render: (_, order) => (
        <span className="whitespace-nowrap">
          {order.recipient.department}
        </span>
      ),
    },
    {
      title: 'Municipio',
      key: 'municipality',
      width: 140,
      render: (_, order) => (
        <span className="whitespace-nowrap">
          {order.recipient.municipality}
        </span>
      ),
    },
    {
      title: <span className="whitespace-nowrap">Paquetes en orden</span>,
      key: 'packages',
      align: 'center',
      width: 150,
      render: (_, order) => (
        <Tag color="green" className="m-0">
          {order.packages.length}
        </Tag>
      ),
    },
    {
      title: 'Modalidad',
      dataIndex: 'paymentMode',
      key: 'paymentMode',
      width: 120,
      render: (paymentMode: PaymentMode) => getPaymentModeTag(paymentMode),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: OrderStatus) => getOrderStatusTag(status),
    },
    {
      title: 'Recolectado',
      key: 'collectedAmount',
      align: 'right',
      width: 120,
      render: (_, order) => (
        <span className="whitespace-nowrap">
          {formatCurrency(order.collectedAmount)}
        </span>
      ),
    },
    {
      title: <span className="whitespace-nowrap">Costo envío</span>,
      dataIndex: 'shippingCost',
      key: 'shippingCost',
      align: 'right',
      width: 120,
      render: (shippingCost: number) => (
        <span className="whitespace-nowrap">
          {formatCurrency(shippingCost)}
        </span>
      ),
    },
    {
      title: 'Comisión',
      key: 'codCommission',
      align: 'right',
      width: 110,
      render: (_, order) => (
        <span className="whitespace-nowrap">
          {formatCurrency(order.codCommission)}
        </span>
      ),
    },
    {
      title: 'Ganancia',
      key: 'revenue',
      align: 'right',
      width: 110,
      render: (_, order) => (
        <span className="whitespace-nowrap">
          {formatCurrency(getBoxfulRevenue(order))}
        </span>
      ),
    },
    {
      title: 'Liquidación',
      dataIndex: 'settlementAmount',
      key: 'settlementAmount',
      align: 'right',
      width: 120,
      render: (settlementAmount: number) => (
        <span
          className={
            settlementAmount >= 0
              ? 'whitespace-nowrap text-emerald-700'
              : 'whitespace-nowrap text-red-700'
          }
        >
          {formatCurrency(settlementAmount)}
        </span>
      ),
    },
  ];

  return (
    <>
      {contextHolder}

      <div className="rounded-xl border border-slate-200 bg-white p-8 lg:p-12">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center">
          <RangePicker
            picker="month"
            size="large"
            format="MMMM"
            placeholder={['Enero', 'Julio']}
            className="w-full md:w-48"
            value={dateRange}
            onChange={(dates) => {
              setDateRange(dates?.[0] && dates[1] ? [dates[0], dates[1]] : null);
            }}
          />

          <Button
            type="primary"
            size="large"
            icon={<SearchOutlined />}
            onClick={loadOrders}
            loading={isLoading}
          >
            Buscar
          </Button>

          <Button
            size="large"
            icon={<DownloadOutlined />}
            onClick={handleDownloadOrders}
            disabled={selectedRowKeys.length === 0}
          >
            Descargar órdenes
          </Button>
        </div>

        <div className="overflow-hidden rounded-b-xl rounded-t border border-slate-100">
          {isLoading ? (
            <div className="flex min-h-80 items-center justify-center">
              <Spin size="large" />
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span className="text-slate-500">
                    Aún no tienes órdenes registradas.
                  </span>
                }
              />
            </div>
          ) : (
            <Table
              rowKey="id"
              columns={columns}
              dataSource={orders}
              pagination={false}
              scroll={{ x: 1540 }}
              rowSelection={{
                selectedRowKeys,
                onChange: setSelectedRowKeys,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
