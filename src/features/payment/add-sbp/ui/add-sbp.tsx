import { SBPIcon } from "@shared/assets/icons/sbp";

export const AddSbp = () => {
  return (
    <div className="bg-[#282828] items-center p-1 rounded-[16px] flex flex-row gap-[9px]">
      <div className="bg-[#131313] size-10 rounded-[12px] flex items-center justify-center">
        <SBPIcon />
      </div>
      <p className="break-words text-lg leading-[1.1] text-white whitespace-nowrap">
        CБП
      </p>
    </div>
  );
};
