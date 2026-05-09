'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dashboardMenuItems } from './dashboard-menu-items';

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-slate-50 px-8 py-10 lg:block">
      <div className="mb-12 flex items-center gap-3">
        <Image
          src="/boxful-logo.webp"
          alt="Boxful logo"
          width={120}
          height={48}
          priority
          className="h-auto"
        />
      </div>

      <p className="mb-6 text-sm font-bold uppercase text-slate-900">Menú</p>

      <nav className="flex flex-col gap-4">
        {dashboardMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'flex items-center gap-5 rounded-lg px-8 py-4 text-base font-medium transition',
                isActive
                  ? '!bg-blue-700 !text-white'
                  : '!text-slate-500 !hover:bg-slate-100 !hover:text-slate-900',
              ].join(' ')}
            >
              <Icon className="text-xl" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
