'use client';

import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/features/auth/api/auth.api';
import type { PublicUser } from '@/features/auth/types/auth.types';
import { getAccessToken, removeAccessToken } from '@/lib/auth/token-storage';
import { Routes } from '@/lib/utils/routes';

interface ProtectedRouteProps {
  children: (user: PublicUser) => React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [user, setUser] = useState<PublicUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function validateSession() {
      const token = getAccessToken();

      if (!token) {
        router.replace(Routes.web.login());
        return;
      }

      try {
        const currentUser = await getCurrentUser();

        setUser(currentUser);
      } catch {
        removeAccessToken();
        router.replace(Routes.web.login());
      } finally {
        setIsLoading(false);
      }
    }

    void validateSession();
  }, [router]);

  if (isLoading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <Spin size="large" />
      </main>
    );
  }

  return children(user);
}
