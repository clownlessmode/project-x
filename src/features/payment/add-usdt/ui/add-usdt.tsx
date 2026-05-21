import { TARRIF_USDT_ICON } from "@shared/config/assets";

export const AddUsdt = () => {
  return (
    <div className="flex flex-row items-center gap-[9px] rounded-[16px] bg-[#282828] p-1">
      <div className="flex size-10 overflow-hidden items-center justify-center rounded-[12px] bg-[#131313]">
        <img
          src={TARRIF_USDT_ICON}
          alt="USDT"
          className="size-6 scale-[2.6] object-cover"
        />
      </div>
      <p className="break-words text-lg leading-[1.1] whitespace-nowrap text-white">
        USDT
      </p>
    </div>
  );
};
