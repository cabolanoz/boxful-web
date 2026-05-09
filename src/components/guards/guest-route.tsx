'use client';

import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/features/auth/api/auth.api';
import { getAccessToken, removeAccessToken } from '@/lib/auth/token-storage';
import { Routes } from '@/lib/utils/routes';

interface GuestRouteProps {
  children: React.ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    async function validateExistingSession() {
      const token = getAccessToken();

      if (!token) {
        setIsCheckingSession(false);
        return;
      }

      try {
        await getCurrentUser();
        router.replace(Routes.web.orders());
      } catch {
        removeAccessToken();
        setIsCheckingSession(false);
      }
    }

    void validateExistingSession();
  }, [router]);

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <Spin size="large" />
      </main>
    );
  }

  return children;
}
