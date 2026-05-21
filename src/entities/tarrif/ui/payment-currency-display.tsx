import type { TarrifPaymentMethod } from "@entities/tarrif/model/types";
import { TARRIF_STARS_ICON, TARRIF_USDT_ICON } from "@shared/config/assets";

type PaymentCurrencyDisplayProps = {
  amount: number;
  currency: TarrifPaymentMethod;
  className?: string;
};

export function PaymentCurrencyDisplay({
  amount,
  currency,
  className,
}: PaymentCurrencyDisplayProps) {
  return (
    <span className={`inline-flex items-center gap-1 ${className ?? ""}`}>
      <span>{amount}</span>
      {currency === "rub" && <span>₽</span>}
      {currency === "usdt" && (
        <span className="inline-flex size-[16px] items-center justify-center overflow-hidden rounded-full bg-transparent">
          <img
            src={TARRIF_USDT_ICON}
            alt="USDT"
            className="scale-[1.4]"
          />
        </span>
      )}
      {currency === "stars" && (
        <img
          src={TARRIF_STARS_ICON}
          alt="Stars"
          className="size-[20px]"
        />
      )}
    </span>
  );
}
