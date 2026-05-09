'use client';

import { App, Form } from 'antd';
import { useState } from 'react';
import { createOrder } from '@/features/orders/api/orders.api';
import type { Order } from '@/features/orders/types/order.types';
import type {
  CreateOrderFormValues,
  CreateOrderPackageFormValues,
} from '@/features/orders/components/create-order/create-order-form.types';
import { mapCreateOrderFormToPayload } from '@/features/orders/utils/map-create-order-form-to-payload';

const firstStepFields: Array<keyof CreateOrderFormValues> = [
  'pickupAddress',
  'scheduledDate',
  'recipientFirstName',
  'recipientLastName',
  'recipientEmail',
  'recipientPhoneCountryCode',
  'recipientPhoneNumber',
  'recipientAddress',
  'recipientDepartment',
  'recipientMunicipality',
  'recipientReferencePoint',
  'recipientInstructions',
  'paymentMode',
  'expectedCollectionAmount',
];

export function useCreateOrderForm() {
  const { message } = App.useApp();
  const [form] = Form.useForm<CreateOrderFormValues>();

  const [currentStep, setCurrentStep] = useState(0);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [informationValues, setInformationValues] =
    useState<CreateOrderFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const goToPackagesStep = async () => {
    await form.validateFields(firstStepFields);
    setInformationValues({
      ...form.getFieldsValue(true),
      packages: [],
    });
    setCurrentStep(1);
  };

  const goToInformationStep = () => {
    setCurrentStep(0);
  };

  const submitOrder = async (packages?: CreateOrderPackageFormValues[]) => {
    try {
      const values = informationValues ?? (await form.validateFields());
      const payload = mapCreateOrderFormToPayload({
        ...values,
        packages: packages ?? values.packages ?? [],
      });

      setIsSubmitting(true);

      const order = await createOrder(payload);

      setCreatedOrder(order);
      setIsSuccessModalOpen(true);
      window.dispatchEvent(new Event('orders:settlement-summary-updated'));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'No se pudo crear la orden';

      message.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const resetForm = () => {
    form.resetFields();
    setCreatedOrder(null);
    setInformationValues(null);
    setCurrentStep(0);
    setIsSuccessModalOpen(false);
  };

  return {
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
  };
}
