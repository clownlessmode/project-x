"use client";

import { setNavFlow } from "@shared/lib/navigation-flow";
import { useRouter } from "next/navigation";

export function AddTariffButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        setNavFlow("profile");
        router.push("/tarrifs");
      }}
      className="flex w-full rounded-[12px] bg-[#282828] p-[10px] text-left transition-colors hover:bg-[#303030] active:bg-[#353535]"
    >
      <div className="flex min-w-0 flex-col gap-2">
        <p className="break-words text-[22px] font-medium leading-[1.1] text-white">
          Добавить тариф
        </p>
        <p className="break-words text-sm italic leading-[1.1] text-white/60">
          Выбрать и оплатить новый ключ
        </p>
      </div>
    </button>
  );
}
