// src/lib/auth/guards.ts
import { redirect } from 'next/navigation';
import { getAuthToken } from './tokens';

export function requireAuth(): void {
  const token = getAuthToken();
  if (!token) {
    redirect('/login');
  }
}

export function requireGuest(): void {
  const token = getAuthToken();
  if (token) {
    redirect('/dashboard');
  }
}