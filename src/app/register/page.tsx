import { GuestRoute } from '@/components/guards/guest-route';
import { AuthWrapper } from '@/components/layout/auth-wrapper';
import { RegisterForm } from '@/features/auth/components/register/register-form';

export default function RegisterPage() {
  return (
    <GuestRoute>
      <AuthWrapper>
        <RegisterForm />
      </AuthWrapper>
    </GuestRoute>
  );
}
