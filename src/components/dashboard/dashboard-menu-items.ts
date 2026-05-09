import { FileSearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Routes } from '@/lib/utils/routes';

export const dashboardMenuItems = [
  {
    label: 'Crear orden',
    href: Routes.web.orders(),
    icon: PlusOutlined,
  },
  {
    label: 'Historial',
    href: Routes.web.history(),
    icon: FileSearchOutlined,
  },
];
