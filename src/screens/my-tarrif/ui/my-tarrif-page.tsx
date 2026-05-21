"use client";

import type { DeviceModel } from "@entities/device/model/types";
import { ActiveTarrifCard } from "@entities/tarrif";
import { springTransition, TITLE_WORD_DELAY } from "@shared/config/motion";
import { useScreenReady } from "@shared/hooks/use-screen-ready";
import { AnimatedTitle } from "@shared/ui/animated-title";
import { Button } from "@shared/ui/button";
import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { createRandomDevice } from "../model/create-random-device";
import type { MyTarrifModel } from "../model/mock";
import { AddDeviceSheet } from "./add-device-sheet";
import { DeleteDeviceDialog } from "./delete-device-dialog";
import { DevicesSection } from "./devices-section";

type MyTarrifPageProps = {
  data: MyTarrifModel;
};

const CARD_DELAY = TITLE_WORD_DELAY * 2 + 0.12;
const ACTION_DELAY = TITLE_WORD_DELAY * 2 + 0.28;
const TITLE_TAP_RESET_MS = 2000;
const TITLE_TAP_TARGET = 5;

export function MyTarrifPage({ data }: MyTarrifPageProps) {
  const isReady = useScreenReady();
  const [devices, setDevices] = useState<DeviceModel[]>(data.devices);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<DeviceModel | null>(
    null,
  );
  const titleTapCountRef = useRef(0);
  const titleTapTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const handleCopy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard may be unavailable outside secure context.
    }
  }, []);

  const handleCopyKey = () => {
    void handleCopy(data.access.key);
    setIsAddSheetOpen(true);
  };

  const handleTitleTap = () => {
    clearTimeout(titleTapTimeoutRef.current);
    titleTapCountRef.current += 1;

    if (titleTapCountRef.current >= TITLE_TAP_TARGET) {
      setDevices((current) => [...current, createRandomDevice()]);
      titleTapCountRef.current = 0;
      return;
    }

    titleTapTimeoutRef.current = setTimeout(() => {
      titleTapCountRef.current = 0;
    }, TITLE_TAP_RESET_MS);
  };

  const handleConfirmDelete = () => {
    if (!deviceToDelete) {
      return;
    }

    setDevices((current) =>
      current.filter((device) => device.id !== deviceToDelete.id),
    );
    setDeviceToDelete(null);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="shrink-0 px-4 pt-6 pb-4">
        <div className="cursor-default" onClick={handleTitleTap}>
          <AnimatedTitle text="Ваш тариф" />
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={
            isReady
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 28, scale: 0.96 }
          }
          transition={springTransition(CARD_DELAY)}
        >
          <ActiveTarrifCard tarrif={data.tarrif} />
        </motion.div>

        <DevicesSection
          devices={devices}
          onDeleteDevice={setDeviceToDelete}
          delay={CARD_DELAY + 0.08}
        />
      </main>

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
          onClick={handleCopyKey}
        >
          Скопировать ключ
        </Button>
      </motion.footer>

      <AddDeviceSheet
        open={isAddSheetOpen}
        access={data.access}
        onClose={() => setIsAddSheetOpen(false)}
        onCopy={handleCopy}
      />

      <DeleteDeviceDialog
        open={Boolean(deviceToDelete)}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeviceToDelete(null)}
      />
    </div>
  );
}
