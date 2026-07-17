"use client";

import { Badge } from "@shared/ui/badge";

type VpnKeyCardProps = {
  title: string;
  subtitle: string;
  description?: string;
  expiryBadge: string;
  expired?: boolean;
  onClick?: () => void;
};

const cardClassName =
  "flex w-full items-start justify-between rounded-[12px] bg-[#282828] p-[10px] text-left";

export function VpnKeyCard({
  title,
  subtitle,
  description,
  expiryBadge,
  expired = false,
  onClick,
}: VpnKeyCardProps) {
  const content = (
    <>
      <div className="flex min-w-0 flex-col gap-2">
        <p className="break-words text-[22px] font-medium leading-[1.1] text-white">
          {title}
        </p>
        <p className="break-words text-sm italic leading-[1.1] text-white/60">
          {subtitle}
        </p>
        {description && (
          <p className="break-words text-sm leading-[1.2] text-white/45">
            {description}
          </p>
        )}
      </div>
      <Badge
        className={`shrink-0 px-[10px] ${expired ? "bg-[#5a3a1a] text-[#ffb86c]" : ""}`}
      >
        {expiryBadge}
      </Badge>
    </>
  );

  if (!onClick) {
    return <div className={cardClassName}>{content}</div>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${cardClassName} transition-colors hover:bg-[#303030] active:bg-[#353535]`}
    >
      {content}
    </button>
  );
}
