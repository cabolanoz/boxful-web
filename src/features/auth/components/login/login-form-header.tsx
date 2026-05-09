import { Typography } from 'antd';

export function LoginFormHeader() {
  return (
    <div className="mb-6">
      <Typography.Title level={3} className="mb-2">
        Bienvenido
      </Typography.Title>

      <Typography.Text type="secondary">
        Por favor ingresa tus credenciales
      </Typography.Text>
    </div>
  );
}
