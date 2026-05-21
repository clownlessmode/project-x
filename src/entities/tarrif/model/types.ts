import { DefaultEntity } from "@shared/utils/default.entity";

export type TarrifPrice = {
  amount: number;
  currency: TarrifPaymentMethod;
};

export type TarrifPaymentMethod = "rub" | "usdt" | "stars";

export interface TarrifModel extends DefaultEntity {
  is_active: boolean;
  title: string;
  subtitle: string;
  devices_count: number;
  period: number;
  prices: readonly TarrifPrice[];
  ribbon?: string;
}
