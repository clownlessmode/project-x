import type { TarrifModel, TarrifPaymentMethod } from "./types";

export type TariffDTO = {
  id: number;
  is_active: boolean;
  title: string;
  subtitle: string;
  description?: string;
  period: number;
  ribbon?: string;
  prices: { currency: string; amount: number }[];
  duration: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export function tariffFromDTO(dto: TariffDTO): TarrifModel {
  const prices = dto.prices
    .filter((p) =>
      (["rub", "usdt", "stars"] as TarrifPaymentMethod[]).includes(
        p.currency as TarrifPaymentMethod,
      ),
    )
    .map((p) => ({
      currency: p.currency as TarrifPaymentMethod,
      amount: p.amount,
    }));

  return {
    id: dto.id,
    is_active: dto.is_active,
    title: dto.title,
    subtitle: dto.subtitle,
    description: dto.description,
    period: dto.period,
    ribbon: dto.ribbon,
    prices,
    created_at: new Date(dto.created_at),
    updated_at: new Date(dto.updated_at),
  };
}

export function tariffFromClientSummary(
  summary: import("@shared/api/types").ClientTariffSummary,
): TarrifModel {
  return tariffFromDTO({
    id: summary.id,
    is_active: true,
    title: summary.title,
    subtitle: summary.subtitle,
    description: summary.description,
    period: summary.period,
    prices: summary.prices,
    duration: "",
    sort_order: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
}
