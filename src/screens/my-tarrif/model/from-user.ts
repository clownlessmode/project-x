import type { ClientUser } from "@shared/api/types";

export type VpnKeyItem = {
  user: ClientUser;
  access: {
    configuration: string;
    key: string;
    link: string;
  };
  title: string;
  subtitle: string;
  description?: string;
  expiryBadge: string;
  status: string;
  renewTariffId?: number;
};

export function resolveShareLink(user: ClientUser): string | null {
  const link = user.share_link?.trim() ?? "";
  if (link.startsWith("vless://")) {
    return link;
  }
  return null;
}

export function formatUserExpiryBadge(user: ClientUser): string {
  if (user.status === "expired") {
    return "истёк";
  }
  if (user.status === "revoked") {
    return "отключён";
  }
  if (!user.expires_at) {
    return "активен";
  }
  const date = new Date(user.expires_at);
  if (Number.isNaN(date.getTime())) {
    return "активен";
  }
  const formatted = date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  return `до ${formatted}`;
}

function tariffSubtitle(user: ClientUser): string {
  const parts = [user.tariff?.subtitle?.trim()].filter(Boolean);
  return parts.join(" · ") || user.name;
}

function tariffDescription(user: ClientUser): string | undefined {
  const text = user.tariff?.description?.trim();
  return text || undefined;
}

export function buildVpnKeyItem(user: ClientUser): VpnKeyItem {
  const shareLink = resolveShareLink(user);

  return {
    user,
    title: user.tariff?.title ?? user.name,
    subtitle: tariffSubtitle(user),
    description: tariffDescription(user),
    expiryBadge: formatUserExpiryBadge(user),
    status: user.status,
    renewTariffId: user.tariff_id ?? user.tariff?.id,
    access: {
      configuration: user.id,
      key: shareLink ?? "",
      link: shareLink ?? "Готовится…",
    },
  };
}

export function buildVpnKeysFromUsers(users: ClientUser[]): VpnKeyItem[] {
  return users.map((user) => buildVpnKeyItem(user));
}

export function hasReadyShareLink(access: VpnKeyItem["access"]): boolean {
  return access.link.startsWith("vless://");
}

export function anyKeyNeedsShareLink(keys: VpnKeyItem[]): boolean {
  return keys.some((key) => !hasReadyShareLink(key.access));
}

export function isKeyExpired(key: VpnKeyItem): boolean {
  return key.status === "expired";
}

export function buildRenewPaymentPath(tariffId: number, userId: string): string {
  return `/payment/${tariffId}/usdt?renew=${encodeURIComponent(userId)}`;
}
