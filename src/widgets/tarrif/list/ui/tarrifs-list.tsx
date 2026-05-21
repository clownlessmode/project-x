"use client";

import { TarrifCard } from "@entities/tarrif";
import { TarrifModel } from "@entities/tarrif/model/types";
import { springTransition, TITLE_WORD_DELAY } from "@shared/config/motion";
import { useScreenReady } from "@shared/hooks/use-screen-ready";
import { motion } from "motion/react";

interface TarrifsListProps {
  tarrifs: TarrifModel[];
  link?: string;
  active?: boolean;
}

const LIST_BASE_DELAY = TITLE_WORD_DELAY * 2 + 0.12;

export const TarrifsList = ({
  tarrifs,
  link,
  active = false,
}: TarrifsListProps) => {
  const isReady = useScreenReady();

  return (
    <ul className="flex min-h-0 flex-1 flex-col gap-[12px] overflow-y-auto px-4 pb-6">
      {tarrifs.map((tarrif, index) => (
        <motion.li
          key={tarrif.id}
          className="w-full"
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={
            isReady
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 28, scale: 0.96 }
          }
          transition={springTransition(LIST_BASE_DELAY + index * 0.08)}
        >
          <TarrifCard {...tarrif} link={link} active={active} />
        </motion.li>
      ))}
    </ul>
  );
};
