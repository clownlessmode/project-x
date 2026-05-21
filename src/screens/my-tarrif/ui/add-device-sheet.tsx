"use client";

import type { MyTarrifAccess } from "../model/mock";
import { AnimatePresence, motion } from "motion/react";
import { CopyField } from "./copy-field";

type AddDeviceSheetProps = {
  open: boolean;
  access: MyTarrifAccess;
  onClose: () => void;
  onCopy: (value: string) => void;
};

export function AddDeviceSheet({
  open,
  access,
  onClose,
  onCopy,
}: AddDeviceSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Закрыть"
            className="fixed inset-0 z-40 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Добавить устройство"
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col gap-[22px] rounded-t-[24px] bg-[#131313] px-4 pt-11 pb-[30px]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 420, damping: 36 }}
          >
            <div className="absolute top-4 left-1/2 h-[3.5px] w-[25px] -translate-x-1/2 rounded-[2.5px] bg-white/18" />

            <CopyField
              label="Конфигурация"
              value={access.configuration}
              onCopy={onCopy}
            />
            <CopyField label="Ключ" value={access.key} onCopy={onCopy} />
            <CopyField label="Ссылка" value={access.link} onCopy={onCopy} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
