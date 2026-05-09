import { Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';

const countryCodeOptions = [
  { label: '503', value: '503' },
  { label: '504', value: '504' },
  { label: '505', value: '505' },
  { label: '506', value: '506' },
];

export function OrderInformationStep() {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} lg={16}>
          <Form.Item
            label="Dirección de recolección"
            name="pickupAddress"
            rules={[
              {
                required: true,
                message: 'La dirección de recolección es requerida',
              },
            ]}
          >
            <Input
              size="large"
              placeholder="San Jerónimo, Masaya, Nicaragua"
            />
          </Form.Item>
        </Col>

        <Col xs={24} lg={8}>
          <Form.Item
            label="Fecha programada"
            name="scheduledDate"
            rules={[
              { required: true, message: 'La fecha programada es requerida' },
            ]}
          >
            <DatePicker
              className="w-full"
              size="large"
              format="DD/MM/YYYY"
              placeholder="Seleccionar"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} lg={8}>
          <Form.Item
            label="Nombres"
            name="recipientFirstName"
            rules={[{ required: true, message: 'Los nombres son requeridos' }]}
          >
            <Input size="large" placeholder="Rebeca Regina" />
          </Form.Item>
        </Col>

        <Col xs={24} lg={8}>
          <Form.Item
            label="Apellidos"
            name="recipientLastName"
            rules={[
              { required: true, message: 'Los apellidos son requeridos' },
            ]}
          >
            <Input size="large" placeholder="Montenegro Alvarado" />
          </Form.Item>
        </Col>

        <Col xs={24} lg={8}>
          <Form.Item
            label="Correo electrónico"
            name="recipientEmail"
            rules={[{ type: 'email', message: 'Ingresa un correo válido' }]}
          >
            <Input size="large" placeholder="rebeca@boxful.com" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} lg={8}>
          <Form.Item label="Teléfono" required>
            <Space.Compact block className="flex w-full">
              <Form.Item
                name="recipientPhoneCountryCode"
                noStyle
                initialValue="503"
                rules={[
                  { required: true, message: 'Código requerido' },
                  { pattern: /^\d{1,4}$/, message: 'Código inválido' },
                ]}
              >
                <Select
                  options={countryCodeOptions}
                  className="w-1/4 flex-0"
                  size="large"
                  popupMatchSelectWidth={false}
                />
              </Form.Item>

              <Form.Item
                name="recipientPhoneNumber"
                noStyle
                rules={[
                  { required: true, message: 'Número requerido' },
                  { pattern: /^\d{7,15}$/, message: 'Número inválido' },
                ]}
              >
                <Input className="w-3/4 flex-1" size="large" placeholder="77777777" />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Col>

        <Col xs={24} lg={16}>
          <Form.Item
            label="Dirección del destinatario"
            name="recipientAddress"
            rules={[
              {
                required: true,
                message: 'La dirección del destinatario es requerida',
              },
            ]}
          >
            <Input
              size="large"
              placeholder="San Jerónimo, Masaya, Nicaragua"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} lg={8}>
          <Form.Item
            label="Departamento"
            name="recipientDepartment"
            rules={[
              { required: true, message: 'El departamento es requerido' },
            ]}
          >
            <Input size="large" placeholder="Masaya" />
          </Form.Item>
        </Col>

        <Col xs={24} lg={8}>
          <Form.Item
            label="Municipio"
            name="recipientMunicipality"
            rules={[{ required: true, message: 'El municipio es requerido' }]}
          >
            <Input size="large" placeholder="Masaya" />
          </Form.Item>
        </Col>

        <Col xs={24} lg={8}>
          <Form.Item label="Punto de referencia" name="recipientReferencePoint">
            <Input size="large" placeholder="Casa color verde" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Indicaciones" name="recipientInstructions">
        <Input size="large" placeholder="Cuidado con el perro" />
      </Form.Item>
    </>
  );
}
