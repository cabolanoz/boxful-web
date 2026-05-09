'use client';

import { Button, Form, Typography } from 'antd';
import Link from 'next/link';
import { useRegisterForm } from '@/features/auth/hooks/use-register-form';
import { Routes } from '@/lib/utils/routes';
import { ContactInformationSection } from './contact-information-section';
import { PasswordSection } from './password-section';
import { PersonalInformationSection } from './personal-information-section';
import { PhoneConfirmationModal } from './phone-confirmation-modal';

export function RegisterForm() {
  const {
    form,
    contextHolder,
    formattedPhone,
    isConfirmModalOpen,
    isSubmitting,
    handleOpenConfirmation,
    handleCloseConfirmation,
    handleConfirmRegister,
  } = useRegisterForm();

  return (
    <>
      {contextHolder}

      <div className="mb-6">
        <Typography.Title level={3} className="mb-2">
          Cuéntanos de ti
        </Typography.Title>

        <Typography.Text type="secondary">
          Completa la información de registro
        </Typography.Text>
      </div>

      <Form form={form} layout="vertical" autoComplete="off">
        <PersonalInformationSection />
        <ContactInformationSection />
        <PasswordSection />

        <Form.Item className="mt-6 mb-4">
          <Button type="primary" block size="large" onClick={handleOpenConfirmation}>
            Siguiente
          </Button>
        </Form.Item>

        <div className="text-center">
          <Typography.Text type="secondary">
            ¿Ya tienes una cuenta?{' '}
          </Typography.Text>

          <Link href={Routes.web.login()} className="font-medium text-blue-700">
            Inicia sesión aquí
          </Link>
        </div>
      </Form>

      <PhoneConfirmationModal
        open={isConfirmModalOpen}
        formattedPhone={formattedPhone}
        isSubmitting={isSubmitting}
        onCancel={handleCloseConfirmation}
        onConfirm={handleConfirmRegister}
      />
    </>
  );
}
