"use client";

import { api } from "@shared/api/client";
import type { ClientUser, TelegramAuthResponse } from "@shared/api/types";
import { assetPath } from "@shared/config/base-path";
import {
  isDevAuthEnabled,
  isDevLoggedOut,
  setDevLoggedOut,
} from "@shared/lib/dev-auth";
import { clearNavFlow } from "@shared/lib/navigation-flow";
import { buildTelegramAuthPayload } from "@shared/lib/telegram-auth-payload";
import { isTelegramMiniApp } from "@shared/lib/telegram-sdk";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const AUTH_STORAGE_KEY = "project-x:telegram-session";
const ROUTE_ONCE_KEY = "project-x:auth-route-done";

type AuthState = {
  ready: boolean;
  loading: boolean;
  error: string | null;
  session: TelegramAuthResponse | null;
  user: ClientUser | null;
  users: ClientUser[];
  displayName: string;
  hasVpn: boolean;
  isNew: boolean;
  devMode: boolean;
  refresh: (options?: { background?: boolean }) => Promise<void>;
  applySession: (session: TelegramAuthResponse) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

function readCachedSession(): TelegramAuthResponse | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as TelegramAuthResponse;
  } catch {
    return null;
  }
}

function writeCachedSession(session: TelegramAuthResponse) {
  sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

function normalizePath(pathname: string) {
  const path = pathname.split("?")[0];
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const routedRef = useRef(false);
  const isReadyRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<TelegramAuthResponse | null>(null);

  const applySession = useCallback((next: TelegramAuthResponse) => {
    setDevLoggedOut(false);
    writeCachedSession(next);
    setSession(next);
    setError(null);
  }, []);

  const authenticate = useCallback(async (options?: { background?: boolean }) => {
    const background = options?.background ?? isReadyRef.current;

    if (!background) {
      setLoading(true);
    }
    setError(null);

    const authPayload = buildTelegramAuthPayload();

    if (isDevAuthEnabled() && isDevLoggedOut()) {
      setSession(null);
      setLoading(false);
      setReady(true);
      return;
    }

    try {
      let result: TelegramAuthResponse;
      if (authPayload) {
        result = await api.telegramAuth(authPayload);
      } else if (!isTelegramMiniApp() && readCachedSession()) {
        result = readCachedSession()!;
      } else {
        throw new Error(
          "Откройте приложение из Telegram или включите режим разработки",
        );
      }
      applySession(result);
    } catch (e) {
      if (authPayload) {
        setError(e instanceof Error ? e.message : String(e));
      } else {
        const cached = readCachedSession();
        if (cached) {
          setSession(cached);
          setError(null);
        } else {
          setError(e instanceof Error ? e.message : String(e));
          setSession(null);
        }
      }
    } finally {
      if (!background) {
        setLoading(false);
      }
      isReadyRef.current = true;
      setReady(true);
    }
  }, [applySession]);

  useEffect(() => {
    void authenticate();
  }, [authenticate]);

  useEffect(() => {
    if (!ready || loading || !session) {
      return;
    }

    const path = normalizePath(pathname);

    if (!session.is_new && path === "/") {
      router.replace(assetPath("/my-tarrif"));
      return;
    }

    if (routedRef.current || sessionStorage.getItem(ROUTE_ONCE_KEY) === "1") {
      routedRef.current = true;
      return;
    }

    const target = session.is_new ? "/" : "/my-tarrif";
    routedRef.current = true;
    sessionStorage.setItem(ROUTE_ONCE_KEY, "1");

    if (path !== normalizePath(target)) {
      router.replace(assetPath(target));
    }
  }, [ready, loading, session, pathname, router]);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(ROUTE_ONCE_KEY);
    if (isDevAuthEnabled()) {
      setDevLoggedOut(true);
    }
    clearNavFlow();
    routedRef.current = false;
    setSession(null);
    setError(null);
    setLoading(false);
    isReadyRef.current = true;
    setReady(true);
    router.replace(assetPath("/"));
  }, [router]);

  const value = useMemo<AuthState>(
    () => ({
      ready,
      loading,
      error,
      session,
      users:
        session?.users ??
        (session?.user ? [session.user] : []),
      user:
        session?.users?.[0] ??
        session?.user ??
        null,
      displayName: session?.display_name ?? "",
      hasVpn:
        session?.has_vpn ??
        Boolean(session?.users?.length || session?.user),
      isNew: session?.is_new ?? false,
      devMode: isDevAuthEnabled(),
      refresh: (options) => authenticate({ background: options?.background ?? true }),
      applySession,
      logout,
    }),
    [ready, loading, error, session, authenticate, applySession, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
