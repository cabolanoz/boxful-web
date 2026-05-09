import type { Dayjs } from 'dayjs';
import type { Gender } from '@/features/auth/types/auth.types';

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: Dayjs;
  email: string;
  whatsappCountryCode: string;
  whatsappNumber: string;
  password: string;
  confirmPassword: string;
}
