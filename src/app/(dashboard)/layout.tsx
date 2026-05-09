import { ProtectedDashboardWrapper } from '@/components/dashboard/protected-dashboard-wrapper';

export default function ProtectedDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedDashboardWrapper>{children}</ProtectedDashboardWrapper>;
}
