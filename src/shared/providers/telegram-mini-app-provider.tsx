"use client";

import { resolveTelegramNavigation } from "@shared/lib/telegram-navigation";
import {
  hideTelegramBackButton,
  initTelegramSdk,
  isTelegramMiniApp,
  showTelegramBackButton,
} from "@shared/lib/telegram-sdk";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function TelegramMiniAppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    initTelegramSdk();
  }, []);

  useEffect(() => {
    if (!isTelegramMiniApp()) {
      return;
    }

    const navigation = resolveTelegramNavigation(pathname);

    if (navigation.mode === "back") {
      return showTelegramBackButton(() => navigation.onAction(router));
    }

    hideTelegramBackButton();
  }, [pathname, router]);

  return children;
}
