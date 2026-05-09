'use client';

import { useState } from 'react';
import type { PublicUser } from '@/features/auth/types/auth.types';
import { DashboardMobileMenu } from './dashboard-mobile-menu';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';

interface DashboardLayoutProps {
  user: PublicUser;
  children: React.ReactNode;
}

export function DashboardLayout({ user, children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <DashboardSidebar />

        <section className="flex min-w-0 flex-1 flex-col">
          <DashboardNavbar
            user={user}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          />

          <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </section>
      </div>

      <DashboardMobileMenu
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </main>
  );
}
