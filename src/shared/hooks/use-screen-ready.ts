"use client";

import { useEffect, useState } from "react";

export function useScreenReady() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return isReady;
}
