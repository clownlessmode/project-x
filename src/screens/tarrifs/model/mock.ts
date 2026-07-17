import type { TarrifModel } from "@entities/tarrif/model/types";

const now = new Date();

export const TARRIFS_MOCK: TarrifModel[] = [
  {
    id: 1,
    is_active: true,
    title: "Starter Access",
    subtitle: "базовый доступ",
    period: 1,
    prices: [
      { currency: "rub", amount: 199 },
      { currency: "usdt", amount: 2.82 },
      { currency: "stars", amount: 122 },
    ],
    created_at: now,
    updated_at: now,
  },
  {
    id: 2,
    is_active: false,
    title: "Extended Value",
    subtitle: "на 3 месяца",
    period: 3,
    prices: [
      { currency: "rub", amount: 537 },
      { currency: "usdt", amount: 7.61 },
      { currency: "stars", amount: 329 },
    ],
    created_at: now,
    updated_at: now,
  },
  {
    id: 3,
    is_active: false,
    title: "Premium Access",
    subtitle: "на полгода",
    period: 6,
    prices: [
      { currency: "rub", amount: 1015 },
      { currency: "usdt", amount: 14.38 },
      { currency: "stars", amount: 622 },
    ],
    created_at: now,
    updated_at: now,
  },
  {
    id: 4,
    is_active: false,
    title: "Best Deal",
    subtitle: "на год",
    description: "максимальная выгода",
    period: 12,
    ribbon: "Выгодно",
    prices: [
      { currency: "rub", amount: 1910 },
      { currency: "usdt", amount: 27.07 },
      { currency: "stars", amount: 1171 },
    ],
    created_at: now,
    updated_at: now,
  },
];
