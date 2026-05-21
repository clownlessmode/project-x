"use client";

import { AnimatedTitle } from "@shared/ui/animated-title";
import { TARRIFS_MOCK } from "../model/mock";
import { TarrifsList } from "@widgets/tarrif/list";

export const TarrifsPage = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="shrink-0 px-4 pt-6 pb-[30px]">
        <AnimatedTitle text="Выбор тарифа" />
      </header>
      <TarrifsList tarrifs={TARRIFS_MOCK} active={false} link="/payment" />
    </div>
  );
};
