export type OrderStatus = 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';

export type PaymentMode = 'STANDARD' | 'COD';

export interface CreateOrderRecipientPayload {
  firstName: string;
  lastName: string;
  email?: string;
  phoneCountryCode: string;
  phoneNumber: string;
  address: string;
  department: string;
  municipality: string;
  referencePoint?: string;
  instructions?: string;
}

export interface CreateOrderPackagePayload {
  lengthCm: number;
  heightCm: number;
  widthCm: number;
  weightPounds: number;
  content: string;
}

export interface CreateOrderPayload {
  pickupAddress: string;
  scheduledDate: string;
  paymentMode?: PaymentMode;
  expectedCollectionAmount?: number;
  recipient: CreateOrderRecipientPayload;
  packages: CreateOrderPackagePayload[];
}

export interface Order {
  id: string;
  trackingCode: string;
  pickupAddress: string;
  scheduledDate: string;
  recipient: CreateOrderRecipientPayload;
  packages: CreateOrderPackagePayload[];
  expectedCollectionAmount?: number;
  collectedAmount?: number;
  shippingCost: number;
  codCommission?: number;
  settlementAmount: number;
  deliveredAt?: string;
  paidAt?: string;
  status: OrderStatus;
  paymentMode: PaymentMode;
  createdAt: string;
  updatedAt: string;
}
