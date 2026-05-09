'use client';

import { Form } from 'antd';
import { useLoginForm } from '@/features/auth/hooks/use-login-form';
import { LoginFormFields } from './login-form-fields';
import { LoginFormHeader } from './login-form-header';

export function LoginForm() {
  const { form, contextHolder, handleFinish } = useLoginForm();

  return (
    <>
      {contextHolder}

      <LoginFormHeader />

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        autoComplete="off"
      >
        <LoginFormFields />
      </Form>
    </>
  );
}
