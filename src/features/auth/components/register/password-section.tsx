import { Col, Form, Input, Row } from 'antd';

export function PasswordSection() {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            { required: true, message: 'La contraseña es requerida' },
            { min: 8, message: 'Debe tener al menos 8 caracteres' },
          ]}
        >
          <Input.Password placeholder="Digitar contraseña" size="large" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="Repetir contraseña"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Debes confirmar la contraseña',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error('Las contraseñas no coinciden'),
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Digitar contraseña" size="large" />
        </Form.Item>
      </Col>
    </Row>
  );
}
