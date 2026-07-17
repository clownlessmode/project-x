import { retrieveRawInitData } from "@telegram-apps/sdk";
import { isTelegramMiniApp } from "@shared/lib/telegram-sdk";

/** Сырая строка initData для проверки на бэкенде. */
export function getTelegramInitData(): string | null {
  if (typeof window === "undefined" || !isTelegramMiniApp()) {
    return null;
  }

  try {
    const raw = retrieveRawInitData();
    if (raw?.trim()) {
      return raw;
    }
  } catch {
    // fallback below
  }

  const legacy = (
    window as Window & { Telegram?: { WebApp?: { initData?: string } } }
  ).Telegram?.WebApp?.initData;
  return legacy?.trim() ? legacy : null;
}
