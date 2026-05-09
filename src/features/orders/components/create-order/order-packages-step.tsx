'use client';

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteFilled,
  InboxOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Empty,
  Form,
  Input,
  Row,
  Space,
  Typography,
  message,
} from 'antd';
import { useState } from 'react';
import type { CreateOrderPackageFormValues } from './create-order-form.types';

export type OrderPackageInput = CreateOrderPackageFormValues;

interface PackageFormValues {
  length: string;
  height: string;
  width: string;
  weight: string;
  content: string;
}

interface OrderPackagesStepProps {
  initialPackages?: OrderPackageInput[];
  onPackagesChange?: (packages: OrderPackageInput[]) => void;
  onBack: () => void;
  onSubmit: (packages: OrderPackageInput[]) => void | Promise<void>;
  isSubmitting?: boolean;
}

interface ReadOnlyPackageFieldProps {
  label: string;
  value: string;
}

const parseNumber = (value: string) => Number(value.replace(',', '.'));

const ReadOnlyPackageField = ({ label, value }: ReadOnlyPackageFieldProps) => (
  <div>
    <Typography.Text strong className="mb-2 block text-slate-950">
      {label}
    </Typography.Text>

    <Input size="large" value={value} readOnly />
  </div>
);

export function OrderPackagesStep({
  initialPackages,
  onPackagesChange,
  onBack,
  onSubmit,
  isSubmitting = false,
}: OrderPackagesStepProps) {
  const [form] = Form.useForm<PackageFormValues>();
  const [messageApi, contextHolder] = message.useMessage();
  const [packages, setPackages] = useState<OrderPackageInput[]>(
    () => initialPackages ?? [],
  );

  const updatePackages = (nextPackages: OrderPackageInput[]) => {
    setPackages(nextPackages);
    onPackagesChange?.(nextPackages);
  };

  const handleAddPackage = async () => {
    try {
      const values = await form.validateFields();

      const newPackage: OrderPackageInput = {
        lengthCm: parseNumber(values.length),
        heightCm: parseNumber(values.height),
        widthCm: parseNumber(values.width),
        weightPounds: parseNumber(values.weight),
        content: values.content.trim(),
      };

      updatePackages([...packages, newPackage]);
      form.resetFields();
    } catch {
      messageApi.error('Completá la información del producto');
    }
  };

  const handleRemovePackage = (index: number) => {
    const nextPackages = packages.filter(
      (_, packageIndex) => packageIndex !== index,
    );

    updatePackages(nextPackages);
  };

  const handleBack = () => {
    onPackagesChange?.(packages);
    onBack();
  };

  const handleSubmit = async () => {
    if (packages.length === 0) {
      messageApi.error('Agregá al menos un producto');
      return;
    }

    await onSubmit(packages);
  };

  return (
    <>
      {contextHolder}

      <div className="rounded-2xl border border-gray-200 bg-white p-8">
        <Typography.Title level={4} className="mb-10 text-slate-950">
          Agrega tus productos
        </Typography.Title>

        <Form form={form} layout="vertical" autoComplete="off">
          <div className="rounded-2xl bg-gray-50 p-8">
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={1}>
                <div className="flex h-full items-center justify-center text-3xl text-slate-400">
                  <InboxOutlined />
                </div>
              </Col>

              <Col xs={24} lg={7}>
                <div>
                  <div className="grid grid-cols-3">
                    <Typography.Text className="mb-2">
                      Largo
                    </Typography.Text>

                    <Typography.Text className="mb-2">
                      Alto
                    </Typography.Text>

                    <Typography.Text className="mb-2">
                      Ancho
                    </Typography.Text>
                  </div>

                  <Space.Compact block>
                    <Form.Item
                      name="length"
                      noStyle
                      rules={[
                        { required: true, message: 'Largo requerido' },
                        {
                          validator: (_, value) => {
                            if (!value || parseNumber(value) > 0) {
                              return Promise.resolve();
                            }

                            return Promise.reject(new Error('Largo inválido'));
                          },
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="15"
                        suffix="cm"
                        inputMode="decimal"
                      />
                    </Form.Item>

                    <Form.Item
                      name="height"
                      noStyle
                      rules={[
                        { required: true, message: 'Alto requerido' },
                        {
                          validator: (_, value) => {
                            if (!value || parseNumber(value) > 0) {
                              return Promise.resolve();
                            }

                            return Promise.reject(new Error('Alto inválido'));
                          },
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="15"
                        suffix="cm"
                        inputMode="decimal"
                      />
                    </Form.Item>

                    <Form.Item
                      name="width"
                      noStyle
                      rules={[
                        { required: true, message: 'Ancho requerido' },
                        {
                          validator: (_, value) => {
                            if (!value || parseNumber(value) > 0) {
                              return Promise.resolve();
                            }

                            return Promise.reject(new Error('Ancho inválido'));
                          },
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="15"
                        suffix="cm"
                        inputMode="decimal"
                      />
                    </Form.Item>
                  </Space.Compact>
                </div>
              </Col>

              <Col xs={24} lg={4}>
                <Form.Item
                  label="Peso en libras"
                  name="weight"
                  className="mb-0"
                  rules={[
                    { required: true, message: 'Peso requerido' },
                    {
                      validator: (_, value) => {
                        if (!value || parseNumber(value) > 0) {
                          return Promise.resolve();
                        }

                        return Promise.reject(new Error('Peso inválido'));
                      },
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="3 libras"
                    inputMode="decimal"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} lg={12}>
                <Form.Item
                  label="Contenido"
                  name="content"
                  className="mb-0"
                  rules={[
                    { required: true, message: 'Contenido requerido' },
                    {
                      whitespace: true,
                      message: 'Contenido requerido',
                    },
                  ]}
                >
                  <Input size="large" placeholder="iPhone 14 pro Max" />
                </Form.Item>
              </Col>
            </Row>

            <div className="flex justify-end">
              <Button
                size="large"
                className="flex h-14 min-w-56 items-center justify-center gap-4 rounded-lg font-semibold"
                onClick={handleAddPackage}
              >
                <span>Agregar</span>
                <PlusOutlined />
              </Button>
            </div>
          </div>
        </Form>

        <div className="mt-6 space-y-4">
          {packages.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-10">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span className="text-gray-500">
                    Agrega los productos que deseas enviar.
                  </span>
                }
              />
            </div>
          ) : (
            packages.map((packageItem, index) => (
              <div
                key={`${packageItem.content}-${index}`}
                className="rounded-2xl border border-lime-500 bg-white p-6"
              >
                <Row gutter={[24, 20]} align="bottom">
                  <Col xs={24} lg={4}>
                    <ReadOnlyPackageField
                      label="Peso en libras"
                      value={`${packageItem.weightPounds} libras`}
                    />
                  </Col>

                  <Col xs={24} lg={10}>
                    <ReadOnlyPackageField
                      label="Contenido"
                      value={packageItem.content}
                    />
                  </Col>

                  <Col xs={24} lg={1}>
                    <div className="flex h-10 items-center justify-center text-3xl text-slate-400">
                      <InboxOutlined />
                    </div>
                  </Col>

                  <Col xs={24} lg={7}>
                    <div>
                      <div className="grid grid-cols-3">
                        <Typography.Text strong className="mb-2 text-slate-950">
                          Largo
                        </Typography.Text>

                        <Typography.Text strong className="mb-2 text-slate-950">
                          Alto
                        </Typography.Text>

                        <Typography.Text strong className="mb-2 text-slate-950">
                          Ancho
                        </Typography.Text>
                      </div>

                      <Space.Compact block>
                        <Input
                          size="large"
                          value={packageItem.lengthCm}
                          suffix="cm"
                          readOnly
                        />

                        <Input
                          size="large"
                          value={packageItem.heightCm}
                          suffix="cm"
                          readOnly
                        />

                        <Input
                          size="large"
                          value={packageItem.widthCm}
                          suffix="cm"
                          readOnly
                        />
                      </Space.Compact>
                    </div>
                  </Col>

                  <Col xs={24} lg={2}>
                    <div className="flex justify-end">
                      <Button
                        danger
                        size="large"
                        className="h-14 w-14 rounded-lg"
                        icon={<DeleteFilled />}
                        onClick={() => handleRemovePackage(index)}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            ))
          )}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <Button
            size="large"
            className="flex h-14 min-w-56 items-center justify-center gap-4 rounded-lg font-semibold"
            onClick={handleBack}
          >
            <ArrowLeftOutlined />
            <span>Regresar</span>
          </Button>

          <Button
            type="primary"
            size="large"
            loading={isSubmitting}
            className="flex h-14 min-w-56 items-center justify-center gap-4 rounded-lg font-semibold"
            onClick={handleSubmit}
          >
            <span>Enviar</span>
            <ArrowRightOutlined />
          </Button>
        </div>
      </div>
    </>
  );
}
