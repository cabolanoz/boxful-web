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
import type { Order } from '@/features/orders/types/order.types';
import { downloadOrdersCsv } from '@/features/orders/utils/download-orders-csv';

const { RangePicker } = DatePicker;

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
      title: 'No. de orden',
      dataIndex: 'trackingCode',
      key: 'trackingCode',
      render: (trackingCode: string) => trackingCode,
    },
    {
      title: 'Nombre',
      key: 'firstName',
      render: (_, order) => order.recipient.firstName,
    },
    {
      title: 'Apellidos',
      key: 'lastName',
      render: (_, order) => order.recipient.lastName,
    },
    {
      title: 'Departamento',
      key: 'department',
      render: (_, order) => order.recipient.department,
    },
    {
      title: 'Municipio',
      key: 'municipality',
      render: (_, order) => order.recipient.municipality,
    },
    {
      title: 'Paquetes en orden',
      key: 'packages',
      align: 'center',
      render: (_, order) => (
        <Tag color="green" className="m-0">
          {order.packages.length}
        </Tag>
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
