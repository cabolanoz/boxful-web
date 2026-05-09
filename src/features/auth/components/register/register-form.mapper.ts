import type { RegisterPayload } from '@/features/auth/types/auth.types';
import { normalizeEmail } from '@/lib/utils/normalize-email';
import type { RegisterFormValues } from './register-form.types';

export function mapRegisterFormToPayload(
  values: RegisterFormValues,
): RegisterPayload {
  return {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    gender: values.gender,
    dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
    email: normalizeEmail(values.email),
    whatsappCountryCode: values.whatsappCountryCode,
    whatsappNumber: values.whatsappNumber.trim(),
    password: values.password,
    confirmPassword: values.confirmPassword,
  };
}
