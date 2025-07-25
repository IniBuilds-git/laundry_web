// src/lib/providers/index.tsx
'use client';

import { AuthProvider } from '@/hooks/{api}/useAuth';
import { QueryProvider } from './query-client';
import { ToastProvider } from './toast-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
        <ToastProvider />
      </AuthProvider>
    </QueryProvider>
  );
}