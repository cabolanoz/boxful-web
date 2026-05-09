import type { CreateOrderPayload } from '@/features/orders/types/order.types';
import type { CreateOrderFormValues } from '@/features/orders/components/create-order/create-order-form.types';

function normalizeOptionalText(value?: string): string | undefined {
  const normalizedValue = value?.trim();

  return normalizedValue ? normalizedValue : undefined;
}

export function mapCreateOrderFormToPayload(
  values: CreateOrderFormValues,
): CreateOrderPayload {
  return {
    pickupAddress: values.pickupAddress.trim(),
    scheduledDate: values.scheduledDate.format('YYYY-MM-DD'),
    recipient: {
      firstName: values.recipientFirstName.trim(),
      lastName: values.recipientLastName.trim(),
      email: normalizeOptionalText(values.recipientEmail)?.toLowerCase(),
      phoneCountryCode: values.recipientPhoneCountryCode.trim(),
      phoneNumber: values.recipientPhoneNumber.trim(),
      address: values.recipientAddress.trim(),
      department: values.recipientDepartment.trim(),
      municipality: values.recipientMunicipality.trim(),
      referencePoint: normalizeOptionalText(values.recipientReferencePoint),
      instructions: normalizeOptionalText(values.recipientInstructions),
    },
    packages: values.packages.map((packageItem) => ({
      lengthCm: Number(packageItem.lengthCm),
      heightCm: Number(packageItem.heightCm),
      widthCm: Number(packageItem.widthCm),
      weightPounds: Number(packageItem.weightPounds),
      content: packageItem.content?.trim() ?? '',
    })),
  };
}
