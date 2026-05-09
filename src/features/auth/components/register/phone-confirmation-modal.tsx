import { WarningFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';

interface PhoneConfirmationModalProps {
  open: boolean;
  formattedPhone: string;
  isSubmitting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function PhoneConfirmationModal({
  open,
  formattedPhone,
  isSubmitting,
  onCancel,
  onConfirm,
}: PhoneConfirmationModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={500}
      closable
      destroyOnHidden
    >
      <div className="py-4">
        <div className="mb-5 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
            <WarningFilled className="text-2xl !text-amber-500" />
          </div>
        </div>

        <div className="mb-2 text-center text-lg text-slate-900">
          Confirmar número <strong>de teléfono</strong>
        </div>

        <p className="mx-auto mb-8 text-center text-sm leading-6 text-slate-600">
          ¿Está seguro que desea continuar con el número{' '}
          <strong>{formattedPhone}</strong>?
        </p>

        <div className="flex justify-end gap-2">
          <Button size="large" onClick={onCancel}>Cancelar</Button>

          <Button type="primary" size="large" onClick={onConfirm} loading={isSubmitting}>
            Aceptar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
