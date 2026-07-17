export function openExternalLink(url: string) {
  const tg = (
    window as Window & {
      Telegram?: { WebApp?: { openLink?: (url: string) => void } };
    }
  ).Telegram?.WebApp;
  if (tg?.openLink) {
    tg.openLink(url);
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}
