import type { Dayjs } from 'dayjs';
import type { PaymentMode } from '@/features/orders/types/order.types';

export interface CreateOrderPackageFormValues {
  lengthCm: number;
  heightCm: number;
  widthCm: number;
  weightPounds: number;
  content: string;
}

export interface CreateOrderFormValues {
  pickupAddress: string;
  scheduledDate: Dayjs;

  recipientFirstName: string;
  recipientLastName: string;
  recipientEmail?: string;
  recipientPhoneCountryCode: string;
  recipientPhoneNumber: string;
  recipientAddress: string;
  recipientDepartment: string;
  recipientMunicipality: string;
  recipientReferencePoint?: string;
  recipientInstructions?: string;
  paymentMode?: PaymentMode;
  expectedCollectionAmount?: number;

  packages: CreateOrderPackageFormValues[];
}
