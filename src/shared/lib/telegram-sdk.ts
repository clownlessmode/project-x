import { backButton, init, isTMA, miniApp } from "@telegram-apps/sdk";

let initialized = false;

export function initTelegramSdk() {
  if (initialized || typeof window === "undefined" || !isTMA()) {
    return;
  }

  init();

  if (miniApp.mountSync.isAvailable()) {
    miniApp.mountSync();
  }

  if (miniApp.ready.isAvailable()) {
    miniApp.ready();
  }

  if (backButton.mount.isAvailable()) {
    backButton.mount();
  }

  initialized = true;
}

export function isTelegramMiniApp() {
  return typeof window !== "undefined" && isTMA();
}

export function closeTelegramMiniApp() {
  if (isTMA() && miniApp.close.isAvailable()) {
    miniApp.close();
  }
}

export function hideTelegramBackButton() {
  if (isTMA() && backButton.hide.isAvailable()) {
    backButton.hide();
  }
}

export function showTelegramBackButton(onClick: () => void) {
  if (!isTMA()) {
    return () => {};
  }

  if (backButton.show.isAvailable()) {
    backButton.show();
  }

  if (!backButton.onClick.isAvailable()) {
    return () => {};
  }

  const off = backButton.onClick(onClick);

  return () => {
    off();
    hideTelegramBackButton();
  };
}
