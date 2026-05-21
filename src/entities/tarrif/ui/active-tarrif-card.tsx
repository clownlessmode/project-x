import { formatTarrifDevicesSubtitle } from "@entities/tarrif/model/format-devices-subtitle";
import { formatTarrifExpiryBadge } from "@entities/tarrif/model/format-expiry-date";
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
            {formatTarrifDevicesSubtitle(tarrif.devices_count)}
          </p>
        </div>
        <Badge className="shrink-0 px-[10px]">
          {formatTarrifExpiryBadge(tarrif.period)}
        </Badge>
      </div>
    </Link>
  );
}
