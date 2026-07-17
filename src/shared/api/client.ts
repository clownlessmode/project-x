import type { TelegramAuthResponse } from "@shared/api/types";
import type { TariffDTO } from "@entities/tarrif/model/from-dto";

const API_BASE = process.env.NEXT_PUBLIC_VPND_API_URL ?? "";

type ApiError = { error?: string };

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as ApiError;
    throw new Error(body.error ?? res.statusText);
  }
  return res.json() as Promise<T>;
}

export type TelegramAuthPayload = {
  init_data?: string;
  telegram_id?: number;
  first_name?: string;
  username?: string;
};

export type TelegramProvisionPayload = TelegramAuthPayload & {
  tariff_id: number;
};

export type CryptoPaymentResponse = {
  payment_id: string;
  status: string;
  amount_usdt: string;
  pay_url: string;
  bot_invoice_url: string;
  mini_app_invoice_url: string;
  test_mode?: boolean;
  session?: TelegramAuthResponse;
};

export type PaymentStatusResponse = {
  payment_id: string;
  status: string;
  session?: TelegramAuthResponse;
};

export const api = {
  telegramAuth: (payload: TelegramAuthPayload) =>
    request<TelegramAuthResponse>("/api/client/telegram/auth", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  telegramProvision: (payload: TelegramProvisionPayload) =>
    request<TelegramAuthResponse>("/api/client/telegram/provision", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  createCryptoPayment: (
    payload: TelegramAuthPayload & {
      tariff_id: number;
      email?: string;
      renew_user_id?: string;
    },
  ) =>
    request<CryptoPaymentResponse>("/api/client/payments/crypto/create", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  paymentStatus: (payload: TelegramAuthPayload & { payment_id: string }) =>
    request<PaymentStatusResponse>("/api/client/payments/status", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  listTariffs: () => request<TariffDTO[]>("/api/client/tariffs"),
  getTariff: (id: number) => request<TariffDTO>(`/api/client/tariffs/${id}`),
};
