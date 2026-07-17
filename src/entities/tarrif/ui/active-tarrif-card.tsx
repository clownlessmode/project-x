import type { TarrifModel } from "@entities/tarrif/model/types";
import { Badge } from "@shared/ui/badge";
import Link from "next/link";

type ActiveTarrifCardProps = {
  tarrif: TarrifModel;
  href?: string;
};

export function ActiveTarrifCard({
  tarrif,
  href = "/tarrifs",
}: ActiveTarrifCardProps) {
  return (
    <Link href={href} className="block">
      <div
        tabIndex={0}
        className="flex items-start justify-between rounded-[12px] bg-[#282828] p-[10px]"
      >
        <div className="flex min-w-0 flex-col gap-2">
          <p className="break-words text-[22px] font-medium leading-[1.1] text-white">
            {tarrif.title}
          </p>
          <p className="break-words text-sm italic leading-[1.1] text-white/60">
            {tarrif.subtitle}
          </p>
          {tarrif.description && (
            <p className="break-words text-sm leading-[1.2] text-white/45">
              {tarrif.description}
            </p>
          )}
        </div>
        <Badge className="shrink-0 px-[10px]">{tarrif.period} мес</Badge>
      </div>
    </Link>
  );
}
