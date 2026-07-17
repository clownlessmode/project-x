"use client";

import type { MyTarrifAccess } from "../model/mock";
import { AnimatePresence, motion } from "motion/react";
import QRCode from "react-qr-code";
import { CopyField } from "./copy-field";

type AddDeviceSheetProps = {
  open: boolean;
  access: MyTarrifAccess;
  onClose: () => void;
};

export function AddDeviceSheet({
  open,
  access,
  onClose,
}: AddDeviceSheetProps) {
  const shareLink = access.link.startsWith("vless://") ? access.link : "";

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
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col gap-[22px] rounded-t-[24px] bg-[#131313] px-4 pt-11 pb-[32px]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 420, damping: 36 }}
          >
            <div className="absolute top-4 left-1/2 h-[3.5px] w-[25px] -translate-x-1/2 rounded-[2.5px] bg-white/18" />

            {shareLink ? (
              <>
                <div className="mx-auto rounded-[16px] bg-white p-3">
                  <QRCode
                    value={shareLink}
                    size={192}
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>
                <CopyField label="Ключ" value={shareLink} autoCopy />
              </>
            ) : (
              <p className="text-center text-sm text-white/60">
                Ключ ещё готовится. Подождите несколько секунд и попробуйте
                снова.
              </p>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
