'use client';

import { Form, message } from 'antd';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/features/auth/api/auth.api';
import { setAccessToken } from '@/lib/auth/token-storage';
import { normalizeEmail } from '@/lib/utils/normalize-email';
import { Routes } from '@/lib/utils/routes';

export interface LoginFormValues {
  email: string;
  password: string;
}

export function useLoginForm() {
  const router = useRouter();
  const [form] = Form.useForm<LoginFormValues>();
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (values: LoginFormValues) => {
    try {
      const response = await loginUser({
        email: normalizeEmail(values.email),
        password: values.password,
      });

      setAccessToken(response.accessToken);
      messageApi.success('Inicio de sesión exitoso');
      router.push(Routes.web.orders());
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'No se pudo iniciar sesión';

      messageApi.error(errorMessage);
    }
  };

  return {
    form,
    contextHolder,
    handleFinish,
  };
}
