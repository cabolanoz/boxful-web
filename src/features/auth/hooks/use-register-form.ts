'use client';

import { Form, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { registerUser } from '@/features/auth/api/auth.api';
import { mapRegisterFormToPayload } from '@/features/auth/components/register/register-form.mapper';
import type { RegisterFormValues } from '@/features/auth/components/register/register-form.types';
import { setAccessToken } from '@/lib/auth/token-storage';
import { Routes } from '@/lib/utils/routes';

export function useRegisterForm() {
  const router = useRouter();
  const [form] = Form.useForm<RegisterFormValues>();
  const [messageApi, contextHolder] = message.useMessage();

  const [pendingValues, setPendingValues] =
    useState<RegisterFormValues | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenConfirmation = async () => {
    try {
      const values = await form.validateFields();

      setPendingValues(values);
      setIsConfirmModalOpen(true);
    } catch {}
  };

  const handleCloseConfirmation = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmRegister = async () => {
    if (!pendingValues) {
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = mapRegisterFormToPayload(pendingValues);
      const response = await registerUser(payload);

      setAccessToken(response.accessToken);
      messageApi.success('Registro exitoso');
      setIsConfirmModalOpen(false);
      router.push(Routes.web.orders());
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'No se pudo registrar';

      messageApi.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedPhone = pendingValues
    ? `+${pendingValues.whatsappCountryCode} ${pendingValues.whatsappNumber}`
    : '';

  return {
    form,
    contextHolder,
    formattedPhone,
    isConfirmModalOpen,
    isSubmitting,
    handleOpenConfirmation,
    handleCloseConfirmation,
    handleConfirmRegister,
  };
}
