"use client";

import { updateNavFlow } from "@shared/lib/navigation-flow";
import { getNavigationDirection } from "@shared/lib/route-order";
import { AnimatePresence, motion, type Variants } from "motion/react";
import {
  GlobalLayoutRouterContext,
  LayoutRouterContext,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";
import { useContext, useRef } from "react";

type NavigationDirection = "forward" | "back";

const EASE = [0.32, 0.72, 0, 1] as const;
const DURATION = 0.34;

const pageVariants: Variants = {
  initial: (direction: NavigationDirection) => ({
    x: direction === "forward" ? "100%" : "-30%",
    zIndex: direction === "forward" ? 2 : 1,
  }),
  animate: {
    x: 0,
    zIndex: 2,
  },
  exit: (direction: NavigationDirection) => ({
    x: direction === "forward" ? "-30%" : "100%",
    zIndex: direction === "forward" ? 1 : 2,
  }),
};

function FrozenRouter({ children }: { children: React.ReactNode }) {
  const layoutContext = useContext(LayoutRouterContext);
  const globalContext = useContext(GlobalLayoutRouterContext);
  const frozenLayoutContext = useRef(layoutContext).current;
  const frozenGlobalContext = useRef(globalContext).current;

  return (
    <GlobalLayoutRouterContext.Provider value={frozenGlobalContext}>
      <LayoutRouterContext.Provider value={frozenLayoutContext}>
        {children}
      </LayoutRouterContext.Provider>
    </GlobalLayoutRouterContext.Provider>
  );
}

export function PageAnimatePresence({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const previousPathRef = useRef(pathname);
  const directionRef = useRef<NavigationDirection>("forward");

  if (previousPathRef.current !== pathname) {
    updateNavFlow(previousPathRef.current, pathname);
    directionRef.current = getNavigationDirection(
      previousPathRef.current,
      pathname,
    );
    previousPathRef.current = pathname;
  }

  const direction = directionRef.current;

  return (
    <div className="relative flex min-h-dvh flex-1 flex-col overflow-hidden bg-background">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={pathname}
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: DURATION, ease: EASE }}
          className="absolute inset-0 flex flex-col bg-background"
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
