import { TARRIF_STARS_ICON, TARRIF_USDT_ICON } from "@shared/config/assets";
import { Badge } from "@shared/ui/badge";
import Link from "next/link";
import { buildTarrifLink } from "../model/build-tarrif-link";
import { formatTarrifPeriod } from "../model/format-period";
import { TarrifModel, TarrifPaymentMethod } from "../model/types";

interface TarrifCardProps extends TarrifModel {
  link?: string;
  active?: boolean;
}

export const TarrifCard = ({
  id,
  is_active,
  title,
  subtitle,
  period,
  prices,
  ribbon,
  link,
  active = false,
}: TarrifCardProps) => {
  const href = link ? buildTarrifLink(link, { id }) : "#";

  return (
    <Link href={href}>
      <div
        tabIndex={0}
        className="relative flex w-full flex-col overflow-hidden rounded-[13px] bg-card p-[10px]"
      >
        {ribbon && !is_active && <TarrifRibbon text={ribbon} />}

        <div className="flex flex-row items-center justify-between">
          <p className="break-words text-[22px] font-medium leading-[1.1] text-white">
            {title}
          </p>
          <Badge>{formatTarrifPeriod(period)}</Badge>
        </div>
        <p className="break-words text-sm italic leading-[1.1] text-white/60 mt-2">
          {subtitle}
        </p>
        <div className="flex flex-row justify-between items-end mt-[26px]">
          <ul className="flex flex-row gap-[10px]">
            {prices.map((price) => (
              <TarrifPriceItem
                key={price.currency}
                amount={price.amount}
                currency={price.currency}
              />
            ))}
          </ul>
          {is_active && active && (
            <p className="text-[#4BC000] text-[14px] font-normal leading-none">
              Подключен
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

function TarrifRibbon({ text }: { text: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute rotate-[-45deg] anchor-center right-[-35px] bottom-1/5 bg-primary h-[20px] flex items-center justify-center w-[130px]"
    >
      <p className="-translate-x-1 text-[12px] font-normal leading-none text-white whitespace-nowrap text-center">
        {text}
      </p>
    </div>
  );
}

type TarrifPriceItemProps = {
  amount: number;
  currency: TarrifPaymentMethod;
};

const TarrifPriceItem = ({ amount, currency }: TarrifPriceItemProps) => {
  return (
    <div className="rounded-full bg-[#131313] items-center justify-center pr-[2.5px] pl-[8.5px] py-[2.5px] flex flex-row gap-1">
      <p className="break-words text-sm whitespace-nowrap text-white">
        {amount}
      </p>
      <div className="size-[23px] rounded-full overflow-hidden bg-[#282828] items-center justify-center flex">
        {currency === "rub" && (
          <p className="text-sm whitespace-nowrap text-white">₽</p>
        )}
        {currency === "usdt" && (
          <img
            src={TARRIF_USDT_ICON}
            alt="USDT"
            className="scale-[1.4]"
          />
        )}
        {currency === "stars" && (
          <img
            src={TARRIF_STARS_ICON}
            alt="Stars"
            className="size-[15px]"
          />
        )}
      </div>
    </div>
  );
};
