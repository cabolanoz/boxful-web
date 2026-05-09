import { Button, Form, Input, Typography } from 'antd';
import Link from 'next/link';
import { Routes } from '@/lib/utils/routes';

export function LoginFormFields() {
  return (
    <>
      <Form.Item
        label="Correo electrónico"
        name="email"
        rules={[
          { required: true, message: 'El correo es requerido' },
          { type: 'email', message: 'Ingresa un correo válido' },
        ]}
      >
        <Input placeholder="Digita tu correo" size="large" />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="password"
        rules={[
          { required: true, message: 'La contraseña es requerida' },
          { min: 8, message: 'Debe tener al menos 8 caracteres' },
        ]}
      >
        <Input.Password placeholder="Digita tu contraseña" size="large" />
      </Form.Item>

      <Form.Item className="mt-6">
        <Button type="primary" htmlType="submit" block size="large">
          Iniciar sesión
        </Button>
      </Form.Item>

      <div className="mt-4 text-center">
        <Typography.Text type="secondary">
          ¿Necesitas una cuenta?{' '}
        </Typography.Text>

        <Link href={Routes.web.register()} className="font-medium text-blue-700">
          Regístrate aquí
        </Link>
      </div>
    </>
  );
}
