"use client";

import { DeviceItem } from "@entities/device";
import type { DeviceModel } from "@entities/device/model/types";
import { springTransition, TITLE_WORD_DELAY } from "@shared/config/motion";
import { useScreenReady } from "@shared/hooks/use-screen-ready";
import { motion } from "motion/react";

type DevicesSectionProps = {
  devices: DeviceModel[];
  onDeleteDevice?: (device: DeviceModel) => void;
  delay?: number;
};

const LIST_BASE_DELAY = TITLE_WORD_DELAY * 2 + 0.12;

export function DevicesSection({
  devices,
  onDeleteDevice,
  delay = LIST_BASE_DELAY,
}: DevicesSectionProps) {
  const isReady = useScreenReady();
  const connectedCount = devices.length;

  return (
    <motion.section
      className="overflow-hidden rounded-[12px] bg-[#282828]"
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={
        isReady
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 28, scale: 0.96 }
      }
      transition={springTransition(delay)}
    >
      <div className="flex flex-col gap-1 p-3">
        <p className="text-lg font-medium leading-[22px] text-white">
          Мои устройства
        </p>
        <p className="text-sm leading-[1.2] text-white/60">
          Подключенные: {connectedCount}
        </p>
      </div>

      {devices.map((device, index) => (
        <DeviceItem
          key={device.id}
          device={device}
          onDelete={onDeleteDevice}
          showDivider={index === 0}
        />
      ))}
    </motion.section>
  );
}
