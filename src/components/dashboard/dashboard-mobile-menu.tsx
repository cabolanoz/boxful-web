'use client';

import { Drawer } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dashboardMenuItems } from './dashboard-menu-items';

interface DashboardMobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function DashboardMobileMenu({
  open,
  onClose,
}: DashboardMobileMenuProps) {
  const pathname = usePathname();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="left"
      size={288}
      title={null}
      closable
    >
      <div className="mb-10 flex items-center">
        <Image
          src="/boxful-logo.webp"
          alt="Boxful logo"
          width={120}
          height={48}
          priority
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
              onClick={onClose}
              className={[
                'flex items-center gap-4 rounded-lg px-5 py-4 text-base font-medium transition',
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
    </Drawer>
  );
}
