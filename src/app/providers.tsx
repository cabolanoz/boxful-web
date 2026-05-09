'use client';

import { App as AntdApp, ConfigProvider } from 'antd';
import { antdTheme } from '@/lib/theme/antd-theme';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ConfigProvider theme={antdTheme}>
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}
