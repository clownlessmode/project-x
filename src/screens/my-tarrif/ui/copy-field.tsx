"use client";

import { Button } from "@shared/ui/button";
import { Copy } from "lucide-react";

type CopyFieldProps = {
  label: string;
  value: string;
  onCopy: (value: string) => void;
};

export function CopyField({ label, value, onCopy }: CopyFieldProps) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <p className="text-sm leading-[1.2] text-white/60">{label}</p>
      <div className="flex h-12 items-center justify-between rounded-[16px] bg-[#282828] py-2.5 pr-1 pl-3.5">
        <p className="truncate text-sm leading-[1.2] text-white">{value}</p>
        <Button
          size="icon-sm"
          aria-label={`Скопировать ${label.toLowerCase()}`}
          className="size-10 rounded-[12px]"
          onClick={() => onCopy(value)}
        >
          <Copy className="size-5" strokeWidth={1.75} />
        </Button>
      </div>
    </div>
  );
}
