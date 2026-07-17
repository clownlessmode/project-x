export type ClientTariffSummary = {
  id: number;
  title: string;
  subtitle: string;
  description?: string;
  period: number;
  prices: { currency: string; amount: number }[];
};

export type ClientUser = {
  id: string;
  name: string;
  uuid: string;
  status: "active" | "expired" | "revoked" | string;
  share_link?: string;
  expires_at?: string;
  created_at?: string;
  tariff_id?: number;
  tariff?: ClientTariffSummary;
};

export type TelegramAuthResponse = {
  is_new: boolean;
  telegram_id: number;
  display_name: string;
  username?: string;
  has_vpn: boolean;
  users?: ClientUser[];
  user?: ClientUser;
};
