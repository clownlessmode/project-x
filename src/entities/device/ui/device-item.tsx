import { formatDeviceAddedDate } from "@entities/device/model/format-added-date";
import type { DeviceModel } from "@entities/device/model/types";
import { AppleIcon } from "@shared/assets/icons/apple";
import { TrashIcon } from "@shared/assets/icons/trash";

type DeviceItemProps = {
  device: DeviceModel;
  onDelete?: (device: DeviceModel) => void;
  showDivider?: boolean;
};

export function DeviceItem({
  device,
  onDelete,
  showDivider = true,
}: DeviceItemProps) {
  return (
    <div
      className={`flex items-center gap-[11px] bg-[#282828] px-3 py-4 ${
        showDivider ? "border-t border-[#474747]" : ""
      }`}
    >
      <div className="relative size-[41px] shrink-0">
        <div className="absolute inset-0 rounded-[6px] bg-[#131313]" />
        <AppleIcon className="absolute left-[5px] top-[5px] size-[31px] text-white" />
      </div>

      <div className="flex min-w-0 flex-1 items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-base font-medium leading-[22px] text-white">
            {device.name}
          </p>
          <p className="text-sm leading-[1.2] text-white/60">
            {formatDeviceAddedDate(device.added_at)}
          </p>
        </div>

        {onDelete && (
          <button
            type="button"
            aria-label={`Удалить ${device.name}`}
            className="shrink-0 text-white/80 transition-opacity hover:text-white"
            onClick={() => onDelete(device)}
          >
            <TrashIcon className="size-[17px]" />
          </button>
        )}
      </div>
    </div>
  );
}
