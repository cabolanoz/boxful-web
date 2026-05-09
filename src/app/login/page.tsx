import { GuestRoute } from '@/components/guards/guest-route';
import { AuthWrapper } from '@/components/layout/auth-wrapper';
import { LoginForm } from '@/features/auth/components/login/login-form';

export default function LoginPage() {
  return (
    <GuestRoute>
      <AuthWrapper>
        <LoginForm />
      </AuthWrapper>
    </GuestRoute>
  );
}
