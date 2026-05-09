import { Col, Form, Input, Row, Select, Space } from 'antd';
import { whatsappCodeOptions } from './register-form-options';

export function ContactInformationSection() {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Correo electrónico"
          name="email"
          rules={[
            { required: true, message: 'El correo es requerido' },
            { type: 'email', message: 'Ingresa un correo válido' },
          ]}
        >
          <Input placeholder="Digitar correo" size="large" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item label="Número de whatsapp" required>
          <Space.Compact block className="flex w-full">
            <Form.Item
              name="whatsappCountryCode"
              noStyle
              initialValue="503"
              rules={[
                { required: true, message: 'Código requerido' },
                { pattern: /^\d{1,4}$/, message: 'Código inválido' },
              ]}
            >
              <Select
                options={whatsappCodeOptions}
                className="w-1/4 flex-0"
                size="large"
                popupMatchSelectWidth={false}
              />
            </Form.Item>

            <Form.Item
              name="whatsappNumber"
              noStyle
              rules={[
                { required: true, message: 'Número requerido' },
                {
                  pattern: /^\d{7,15}$/,
                  message: 'Número inválido',
                },
              ]}
            >
              <Input
                className="w-3/4 flex-1"
                placeholder="7777 7777"
                size="large"
              />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
      </Col>
    </Row>
  );
}
