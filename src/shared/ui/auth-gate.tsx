"use client";

import { useAuth } from "@shared/providers/auth-provider";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { ready, loading, error } = useAuth();

  if (!ready) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 px-6">
        <div className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        <p className="text-center text-sm text-white/70">Подключаемся…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2 px-6 text-center">
        <p className="text-base font-medium">Не удалось войти</p>
        <p className="text-sm text-white/60">{error}</p>
      </div>
    );
  }

  return children;
}
