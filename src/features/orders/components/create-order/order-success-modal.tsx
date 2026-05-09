import { CheckCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import type { Order } from '@/features/orders/types/order.types';

interface OrderSuccessModalProps {
  open: boolean;
  order: Order | null;
  onGoHome: () => void;
  onCreateAnother: () => void;
}

export function OrderSuccessModal({
  open,
  order,
  onGoHome,
  onCreateAnother,
}: OrderSuccessModalProps) {
  return (
    <Modal open={open} footer={null} centered width={420} closable={false}>
      <div className="py-6 text-center">
        <div className="mb-5 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircleFilled className="text-3xl !text-emerald-600" />
          </div>
        </div>

        <h2 className="mb-2 text-lg text-slate-900">
          Orden <strong>enviada</strong>
        </h2>

        <p className="mx-auto mb-2 max-w-72 text-sm text-slate-500">
          La orden ha sido creada y enviada.
        </p>

        {order ? (
          <p className="mb-8 text-sm font-medium text-slate-700">
            Tracking: {order.trackingCode}
          </p>
        ) : null}

        <div className="flex justify-center gap-2">
          <Button size="large" onClick={onGoHome}>Ir a inicio</Button>

          <Button type="primary" size="large" onClick={onCreateAnother}>
            Crear otra
          </Button>
        </div>
      </div>
    </Modal>
  );
}
