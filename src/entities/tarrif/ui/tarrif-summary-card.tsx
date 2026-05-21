import { formatTarrifPeriod } from "@entities/tarrif/model/format-period";
import type { TarrifModel } from "@entities/tarrif/model/types";
import { Badge } from "@shared/ui/badge";

type TarrifSummaryCardProps = {
  tarrif: TarrifModel;
};

export function TarrifSummaryCard({ tarrif }: TarrifSummaryCardProps) {
  return (
    <div className="mt-4 flex flex-col gap-2 rounded-[13px] bg-card p-[10px]">
      <div className="flex flex-row items-center justify-between gap-3">
        <p className="break-words text-[22px] font-medium leading-[1.1] text-white">
          {tarrif.title}
        </p>
        <Badge>{formatTarrifPeriod(tarrif.period)}</Badge>
      </div>
      <p className="break-words text-sm italic leading-[1.1] text-white/60">
        {tarrif.subtitle}
      </p>
    </div>
  );
}
