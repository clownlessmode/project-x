"use client";

import { springTransition, TITLE_WORD_DELAY } from "@shared/config/motion";
import { assetPath } from "@shared/config/base-path";
import { useScreenReady } from "@shared/hooks/use-screen-ready";
import { useAuth } from "@shared/providers/auth-provider";
import { AnimatedTitle } from "@shared/ui/animated-title";
import { Button } from "@shared/ui/button";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  buildRenewPaymentPath,
  hasReadyShareLink,
  isKeyExpired,
  type VpnKeyItem,
} from "../model/from-user";
import { AddDeviceSheet } from "./add-device-sheet";
import { AddTariffButton } from "./add-tariff-button";
import { VpnKeyCard } from "./vpn-key-card";

type MyTarrifPageProps = {
  keys: VpnKeyItem[];
  loading?: boolean;
};

const LIST_BASE_DELAY = TITLE_WORD_DELAY * 2 + 0.12;
const ACTION_DELAY = TITLE_WORD_DELAY * 2 + 0.28;
const TITLE_TAP_RESET_MS = 2000;
const LOGOUT_TAP_TARGET = 10;

export function MyTarrifPage({ keys, loading = false }: MyTarrifPageProps) {
  const { logout } = useAuth();
  const router = useRouter();
  const isReady = useScreenReady();
  const [activeKey, setActiveKey] = useState<VpnKeyItem | null>(null);
  const titleTapCountRef = useRef(0);
  const titleTapTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const isSingleKey = keys.length === 1;
  const singleKey = isSingleKey ? keys[0] : null;
  const singleExpired = singleKey ? isKeyExpired(singleKey) : false;
  const shareLink =
    singleKey && hasReadyShareLink(singleKey.access)
      ? singleKey.access.link
      : "";

  const handleTitleTap = () => {
    clearTimeout(titleTapTimeoutRef.current);
    titleTapCountRef.current += 1;

    if (titleTapCountRef.current >= LOGOUT_TAP_TARGET) {
      titleTapCountRef.current = 0;
      logout();
      return;
    }

    titleTapTimeoutRef.current = setTimeout(() => {
      titleTapCountRef.current = 0;
    }, TITLE_TAP_RESET_MS);
  };

  const handlePrimaryAction = () => {
    if (!singleKey) {
      return;
    }
    if (singleExpired && singleKey.renewTariffId) {
      router.push(
        assetPath(
          buildRenewPaymentPath(singleKey.renewTariffId, singleKey.user.id),
        ),
      );
      return;
    }
    setActiveKey(singleKey);
  };

  const primaryLabel = () => {
    if (singleExpired) {
      return "Продлить доступ";
    }
    if (shareLink) {
      return "Скопировать ключ";
    }
    return "Ключ готовится…";
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="shrink-0 px-4 pt-6 pb-4">
        <div className="cursor-default" onClick={handleTitleTap}>
          <AnimatedTitle
            text={isSingleKey ? "Ваш тариф" : "Ваши тарифы"}
          />
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4">
        {loading && (
          <p className="px-1 text-sm text-white/60">Загружаем ключи…</p>
        )}
        {keys.map((key, index) => (
          <motion.div
            key={key.user.id}
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={
              isReady
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 28, scale: 0.96 }
            }
            transition={springTransition(LIST_BASE_DELAY + index * 0.08)}
          >
            <VpnKeyCard
              title={key.title}
              subtitle={key.subtitle}
              description={key.description}
              expiryBadge={key.expiryBadge}
              expired={isKeyExpired(key)}
              onClick={
                isSingleKey
                  ? undefined
                  : () => {
                      if (isKeyExpired(key) && key.renewTariffId) {
                        router.push(
                          assetPath(
                            buildRenewPaymentPath(
                              key.renewTariffId,
                              key.user.id,
                            ),
                          ),
                        );
                        return;
                      }
                      setActiveKey(key);
                    }
              }
            />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={
            isReady
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 28, scale: 0.96 }
          }
          transition={springTransition(LIST_BASE_DELAY + keys.length * 0.08)}
        >
          <AddTariffButton />
        </motion.div>
      </main>

      {isSingleKey && (
        <motion.footer
          className="shrink-0 px-4 pt-4 pb-[32px] shadow-[0px_0px_2px_rgba(0,0,0,0.04),0px_-4px_4px_rgba(0,0,0,0.06)]"
          initial={{ y: 120, opacity: 0 }}
          animate={isReady ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 28,
            mass: 0.85,
            delay: ACTION_DELAY,
          }}
        >
          <Button
            className="h-[50px] w-full rounded-[16px] text-xl font-medium"
            onClick={handlePrimaryAction}
            disabled={!singleExpired && !shareLink}
          >
            {primaryLabel()}
          </Button>
        </motion.footer>
      )}

      <AddDeviceSheet
        open={Boolean(activeKey)}
        access={activeKey?.access ?? { configuration: "", key: "", link: "" }}
        onClose={() => setActiveKey(null)}
      />
    </div>
  );
}
