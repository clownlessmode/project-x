"use client";

import type { ComponentType, SVGProps } from "react";
import { GeminiIcon } from "@shared/assets/icons/gemini";
import { cn } from "@shared/utils/utils";
import { GPTIcon } from "@shared/assets/icons/gpt";
import { GoogleMeetIcon } from "@shared/assets/icons/google-meet";
import { GoogleAiIcon } from "@shared/assets/icons/google-ai";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const SIZE = 261.037;
const CENTER = SIZE / 2;
const ORBIT_RADIUS = CENTER;
const ORBIT_ITEM_SIZE = 42.166;
const ORBIT_ICON_CLASS = "size-[22.705px]";

const EASE = [0.32, 0.72, 0, 1] as const;
const ENTRANCE_DELAY = 0.35;
const CENTER_STAGGER = 0.1;

type OrbitIcon = ComponentType<SVGProps<SVGSVGElement>>;

const ORBIT_ITEMS: { id: string; Icon: OrbitIcon }[] = [
  { id: "gemini", Icon: GeminiIcon },
  { id: "orbit-2", Icon: GPTIcon },
  { id: "orbit-3", Icon: GoogleMeetIcon },
  { id: "orbit-4", Icon: GeminiIcon },
  { id: "orbit-5", Icon: GoogleAiIcon },
  { id: "orbit-6", Icon: GeminiIcon },
  { id: "orbit-7", Icon: GeminiIcon },
];

const CENTER_LAYERS = [
  { r: 24.79, className: "fill-primary opacity-100" },
  { r: 48.275, className: "fill-primary opacity-60" },
  { r: 70.45, className: "fill-primary opacity-40" },
  { r: 93.45, className: "fill-primary opacity-10" },
];

const ORBIT_BASE_DELAY =
  ENTRANCE_DELAY + CENTER_LAYERS.length * CENTER_STAGGER + 0.08;
const ORBIT_STAGGER = 0.07;

export const WelcomeAnimation = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <motion.div
      className="relative mx-auto shrink-0"
      style={{ width: SIZE, height: SIZE }}
      initial={{ opacity: 0, scale: 0.88, filter: "blur(8px)" }}
      animate={
        isReady
          ? { opacity: 1, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, scale: 0.88, filter: "blur(8px)" }
      }
      transition={{ duration: 0.55, ease: EASE, delay: ENTRANCE_DELAY }}
    >
      <Center isReady={isReady} />
      <OrbitRing isReady={isReady} />
    </motion.div>
  );
};

const centerBounceTransition = (index: number) => ({
  type: "spring" as const,
  stiffness: 380,
  damping: 12,
  mass: 0.7,
  delay: ENTRANCE_DELAY + index * CENTER_STAGGER,
});

const Center = ({ isReady }: { isReady: boolean }) => {
  return (
    <svg
      className="absolute inset-0"
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-hidden
    >
      {CENTER_LAYERS.map((layer, index) => (
        <motion.circle
          key={layer.r}
          cx={CENTER}
          cy={CENTER}
          initial={{ r: 0, opacity: 0 }}
          animate={{
            r: isReady ? layer.r : 0,
            opacity: isReady ? 1 : 0,
          }}
          transition={centerBounceTransition(index)}
          className={layer.className}
        />
      ))}
      <motion.circle
        cx={CENTER}
        cy={CENTER}
        r={CENTER}
        fill="none"
        className="stroke-primary"
        strokeWidth={1.203}
        strokeDasharray="6 6"
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 0.5 : 0 }}
        transition={{
          duration: 0.4,
          ease: EASE,
          delay: ENTRANCE_DELAY + CENTER_LAYERS.length * CENTER_STAGGER,
        }}
      />
    </svg>
  );
};

const ORBIT_DURATION_S = 18;

const OrbitRing = ({ isReady }: { isReady: boolean }) => {
  const count = ORBIT_ITEMS.length;

  return (
    <>
      {ORBIT_ITEMS.map(({ id, Icon }, index) => (
        <motion.div
          key={id}
          className="welcome-orbit-travel pointer-events-none"
          style={{
            width: ORBIT_ITEM_SIZE,
            height: ORBIT_ITEM_SIZE,
            marginLeft: -(ORBIT_ITEM_SIZE / 2),
            marginTop: -(ORBIT_ITEM_SIZE / 2),
            offsetPath: `circle(${ORBIT_RADIUS}px at ${CENTER}px ${CENTER}px)`,
            animationDelay: `-${(index / count) * ORBIT_DURATION_S}s`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isReady ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 14,
            mass: 0.7,
            delay: ORBIT_BASE_DELAY + index * ORBIT_STAGGER,
          }}
        >
          <OrbitItem icon={Icon} />
        </motion.div>
      ))}
    </>
  );
};

export type OrbitItemProps = {
  icon: OrbitIcon;
  className?: string;
};

export const OrbitItem = ({ icon: Icon, className }: OrbitItemProps) => {
  return (
    <div
      className={cn(
        "flex size-[42.166px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#1A1A1A]",
        className,
      )}
    >
      <Icon className={ORBIT_ICON_CLASS} aria-hidden />
    </div>
  );
};
