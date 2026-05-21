import type { TarrifPaymentMethod } from "@entities/tarrif/model/types";

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
            src="/tarrifs/usdt-icon.png"
            alt="USDT"
            className="scale-[1.4]"
          />
        </span>
      )}
      {currency === "stars" && (
        <img
          src="/tarrifs/stars-icon.png"
          alt="Stars"
          className="size-[20px]"
        />
      )}
    </span>
  );
}
