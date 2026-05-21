import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  getNavFlow,
  getProfileTarrifId,
} from "@shared/lib/navigation-flow";
import { closeTelegramMiniApp } from "@shared/lib/telegram-sdk";

export type TelegramNavMode = "back" | "close";

type TelegramNavigation = {
  mode: TelegramNavMode;
  onAction: (router: AppRouterInstance) => void;
};

function normalizePath(pathname: string) {
  const path = pathname.split("?")[0];
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

export function resolveTelegramNavigation(pathname: string): TelegramNavigation {
  const path = normalizePath(pathname);
  const flow = getNavFlow();

  const paymentMethodMatch = path.match(/^\/payment\/([^/]+)\/([^/]+)$/);

  if (paymentMethodMatch && paymentMethodMatch[2] !== "success") {
    const tarrifId = paymentMethodMatch[1];

    return {
      mode: "back",
      onAction: (router) => router.push(`/payment/${tarrifId}`),
    };
  }

  if (/^\/payment\/[^/]+$/.test(path)) {
    if (flow === "profile") {
      return {
        mode: "back",
        onAction: (router) => router.push("/tarrifs"),
      };
    }

    return {
      mode: "close",
      onAction: () => closeTelegramMiniApp(),
    };
  }

  if (path === "/tarrifs") {
    if (flow === "profile") {
      const tarrifId = getProfileTarrifId();

      return {
        mode: "back",
        onAction: (router) =>
          router.push(tarrifId ? `/my-tarrif/${tarrifId}` : "/my-tarrif"),
      };
    }

    return {
      mode: "close",
      onAction: () => closeTelegramMiniApp(),
    };
  }

  if (/^\/payment\/[^/]+\/success$/.test(path)) {
    return {
      mode: "close",
      onAction: () => closeTelegramMiniApp(),
    };
  }

  if (path === "/" || /^\/my-tarrif(\/[^/]+)?$/.test(path)) {
    return {
      mode: "close",
      onAction: () => closeTelegramMiniApp(),
    };
  }

  return {
    mode: "close",
    onAction: () => closeTelegramMiniApp(),
  };
}
