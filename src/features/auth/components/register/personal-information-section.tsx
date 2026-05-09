import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { genderOptions } from './register-form-options';

export function PersonalInformationSection() {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Nombre"
            name="firstName"
            rules={[{ required: true, message: 'El nombre es requerido' }]}
          >
            <Input placeholder="Digita tu nombre" size="large" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Apellido"
            name="lastName"
            rules={[{ required: true, message: 'El apellido es requerido' }]}
          >
            <Input placeholder="Digita tu apellido" size="large" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Sexo"
            name="gender"
            rules={[{ required: true, message: 'Selecciona una opción' }]}
          >
            <Select
              placeholder="Seleccionar"
              options={genderOptions}
              size="large"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Fecha de nacimiento"
            name="dateOfBirth"
            rules={[{ required: true, message: 'La fecha es requerida' }]}
          >
            <DatePicker
              placeholder="Seleccionar"
              size="large"
              format="YYYY-MM-DD"
              className="w-full"
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
