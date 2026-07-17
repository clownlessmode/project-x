import type { TelegramAuthPayload } from "@shared/api/client";
import { getTelegramInitData } from "@shared/lib/telegram-init-data";

export function buildTelegramAuthPayload(): TelegramAuthPayload | null {
  const initData = getTelegramInitData();
  if (initData) {
    return { init_data: initData };
  }
  if (process.env.NEXT_PUBLIC_TELEGRAM_DEV_AUTH !== "1") {
    return null;
  }
  const id = Number(process.env.NEXT_PUBLIC_TELEGRAM_DEV_ID ?? "900001");
  if (!Number.isFinite(id) || id <= 0) {
    return null;
  }
  return {
    telegram_id: id,
    first_name: process.env.NEXT_PUBLIC_TELEGRAM_DEV_NAME ?? "Dev User",
    username: process.env.NEXT_PUBLIC_TELEGRAM_DEV_USERNAME,
  };
}
