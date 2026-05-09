'use client';

import {
  DownOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import type { PublicUser } from '@/features/auth/types/auth.types';
import { removeAccessToken } from '@/lib/auth/token-storage';
import { Routes } from '@/lib/utils/routes';

interface DashboardNavbarProps {
  user: PublicUser;
  onOpenMobileMenu: () => void;
}

const titleByPathname: Record<string, string> = {
  [Routes.web.orders()]: 'Crear orden',
  [Routes.web.history()]: 'Historial',
};

export function DashboardNavbar({
  user,
  onOpenMobileMenu,
}: DashboardNavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    removeAccessToken();
    router.replace(Routes.web.login());
  };

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Cerrar sesión',
      onClick: handleLogout,
    },
  ];

  const displayName = `${user.firstName} ${user.lastName}`.trim();

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:h-24 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 lg:hidden"
          onClick={onOpenMobileMenu}
          aria-label="Abrir menú"
        >
          <MenuOutlined className="text-xl" />
        </button>

        <h1 className="truncate text-xl font-medium text-slate-900 lg:text-2xl">
          {titleByPathname[pathname] ?? 'Boxful'}
        </h1>
      </div>

      <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-slate-900 transition hover:bg-slate-100 sm:gap-3 sm:px-3"
        >
          <UserOutlined />
          <span className="hidden max-w-48 truncate text-base sm:inline lg:text-lg">
            {displayName || 'Usuario'}
          </span>
          <DownOutlined className="text-xs" />
        </button>
      </Dropdown>
    </header>
  );
}
