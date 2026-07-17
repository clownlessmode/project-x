"use client";

import { useAuth } from "@shared/providers/auth-provider";
import { useEffect, useMemo } from "react";
import {
  anyKeyNeedsShareLink,
  buildVpnKeysFromUsers,
} from "../model/from-user";
import { MyTarrifPage } from "./my-tarrif-page";

export function MyTarrifPageClient() {
  const { users, hasVpn, refresh, ready } = useAuth();
  const keys = useMemo(() => buildVpnKeysFromUsers(users), [users]);

  useEffect(() => {
    if (!ready || !hasVpn || keys.length === 0) {
      return;
    }
    if (!anyKeyNeedsShareLink(keys)) {
      return;
    }
    const id = window.setInterval(() => {
      void refresh();
    }, 3000);
    return () => window.clearInterval(id);
  }, [keys, hasVpn, ready, refresh]);

  if (!ready) {
    return null;
  }

  return <MyTarrifPage keys={keys} loading={hasVpn && keys.length === 0} />;
}
