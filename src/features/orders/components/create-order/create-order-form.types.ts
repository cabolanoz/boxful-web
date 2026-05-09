import type { Dayjs } from 'dayjs';

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

  packages: CreateOrderPackageFormValues[];
}
