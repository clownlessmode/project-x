"use client";

import { Button } from "@shared/ui/button";
import { AnimatePresence, motion } from "motion/react";

type DeleteDeviceDialogProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteDeviceDialog({
  open,
  onConfirm,
  onCancel,
}: DeleteDeviceDialogProps) {
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
            onClick={onCancel}
          />

          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-device-title"
            className="fixed top-1/2 left-1/2 z-50 flex w-[294px] -translate-x-1/2 -translate-y-1/2 flex-col gap-[18px] rounded-[20px] bg-[#282828] p-6"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
          >
            <p
              id="delete-device-title"
              className="text-center text-[22px] leading-[1.1] text-white"
            >
              Вы действительно хотите удалить устройство?
            </p>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="h-[42px] flex-1 rounded-[12px] bg-[#131313] text-base font-normal text-white hover:bg-[#131313]/90"
                onClick={onConfirm}
              >
                Удалить
              </Button>
              <Button
                className="h-[42px] flex-1 rounded-[12px] text-base font-medium"
                onClick={onCancel}
              >
                Отмена
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
