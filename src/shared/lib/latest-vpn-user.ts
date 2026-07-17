import type { ClientUser, TelegramAuthResponse } from "@shared/api/types";

export function latestVpnUser(
  session: TelegramAuthResponse | null | undefined,
): ClientUser | null {
  if (!session) {
    return null;
  }
  const users =
    session.users && session.users.length > 0
      ? session.users
      : session.user
        ? [session.user]
        : [];
  return users.at(-1) ?? null;
}
