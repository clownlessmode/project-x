"use client";

import { TarrifsList } from "@widgets/tarrif/list";
import { AnimatedTitle } from "@shared/ui/animated-title";
import { useTariffs } from "@shared/hooks/use-tariffs";

export const TarrifsPage = () => {
  const { tariffs, loading, error } = useTariffs();

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="shrink-0 px-4 pt-6 pb-[30px]">
        <AnimatedTitle text="Выбор тарифа" />
      </header>
      {loading ? (
        <p className="px-4 text-sm text-muted-foreground">Загрузка тарифов…</p>
      ) : error ? (
        <p className="px-4 text-sm text-destructive">{error}</p>
      ) : (
        <TarrifsList tarrifs={tariffs} active={false} link="/payment" />
      )}
    </div>
  );
};
