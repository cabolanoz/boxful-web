import { redirect } from 'next/navigation';
import { Routes } from '@/lib/utils/routes';

export default function HomePage() {
  redirect(Routes.web.login());
}
