export const MOTION_EASE = [0.32, 0.72, 0, 1] as const;

export const TITLE_WORD_DELAY = 0.08;

export const springTransition = (
  delay = 0,
  config?: { stiffness?: number; damping?: number; mass?: number },
) => ({
  type: "spring" as const,
  stiffness: config?.stiffness ?? 360,
  damping: config?.damping ?? 26,
  mass: config?.mass ?? 0.8,
  delay,
});

export const fadeUpBlurTransition = (delay = 0) => ({
  duration: 0.45,
  ease: MOTION_EASE,
  delay,
});
