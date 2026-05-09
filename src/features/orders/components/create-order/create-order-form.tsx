'use client';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import { useState } from 'react';
import { useCreateOrderForm } from '@/features/orders/hooks/use-create-order-form';
import { OrderInformationStep } from './order-information-step';
import {
  OrderPackagesStep,
  type OrderPackageInput,
} from './order-packages-step';
import { OrderSuccessModal } from './order-success-modal';

export function CreateOrderForm() {
  const [orderPackages, setOrderPackages] = useState<OrderPackageInput[]>([]);

  const {
    form,
    currentStep,
    createdOrder,
    isSubmitting,
    isSuccessModalOpen,
    goToPackagesStep,
    goToInformationStep,
    submitOrder,
    closeSuccessModal,
    resetForm,
  } = useCreateOrderForm();

  const handleGoHome = () => {
    closeSuccessModal();
    setOrderPackages([]);
    resetForm();
  };

  const handleCreateAnother = () => {
    setOrderPackages([]);
    resetForm();
  };

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-8 lg:p-12">
        <h3 className="mb-8 text-lg font-bold text-slate-900">
          {currentStep === 0 ? 'Completa los datos' : 'Agrega tus productos'}
        </h3>

        {currentStep === 0 ? (
          <Form form={form} layout="vertical" autoComplete="off">
            <OrderInformationStep />

            <div className="mt-8 flex justify-end">
              <Button
                type="primary"
                size="large"
                className="flex h-14 min-w-56 items-center justify-center gap-4 rounded-lg font-semibold"
                onClick={goToPackagesStep}
              >
                <span>Siguiente</span>
                <ArrowRightOutlined />
              </Button>
            </div>
          </Form>
        ) : (
          <OrderPackagesStep
            initialPackages={orderPackages}
            onPackagesChange={setOrderPackages}
            onBack={goToInformationStep}
            onSubmit={submitOrder}
            isSubmitting={isSubmitting}
          />
        )}
      </div>

      <OrderSuccessModal
        open={isSuccessModalOpen}
        order={createdOrder}
        onGoHome={handleGoHome}
        onCreateAnother={handleCreateAnother}
      />
    </>
  );
}
