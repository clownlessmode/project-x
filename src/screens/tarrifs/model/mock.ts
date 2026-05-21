import type { TarrifModel } from "@entities/tarrif/model/types";

const now = new Date();

export const TARRIFS_MOCK: TarrifModel[] = [
  {
    id: 1,
    is_active: true,
    title: "Starter Access",
    subtitle: "доступ для 3-х устройств",
    period: 1,
    devices_count: 3,
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
    subtitle: "доступ для 5-ти устройств",
    period: 3,
    devices_count: 5,
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
    subtitle: "доступ для 8-ми устройств",
    period: 6,
    devices_count: 8,
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
    subtitle: "доступ для 12-ти устройств",
    period: 12,
    devices_count: 12,
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
