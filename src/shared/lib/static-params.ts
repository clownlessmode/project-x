import type { PaymentMethodSlug } from "@entities/tarrif/model/payment-method";

const API_BASE = process.env.NEXT_PUBLIC_VPND_API_URL ?? "";

const PAYMENT_METHODS: PaymentMethodSlug[] = ["sbp", "usdt", "stars"];

const FALLBACK_TARIFF_IDS = Array.from({ length: 20 }, (_, i) => i + 1);

async function fetchTariffIds(): Promise<number[]> {
  if (!API_BASE) {
    return FALLBACK_TARIFF_IDS;
  }
  try {
    const res = await fetch(`${API_BASE}/api/client/tariffs`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(String(res.status));
    }
    const data = (await res.json()) as { id: number }[];
    const ids = data.map((t) => t.id);
    if (ids.length === 0) {
      return FALLBACK_TARIFF_IDS;
    }
    const merged = new Set([...ids, ...FALLBACK_TARIFF_IDS]);
    return [...merged].sort((a, b) => a - b);
  } catch {
    return FALLBACK_TARIFF_IDS;
  }
}

export async function getTarrifRouteParams() {
  const ids = await fetchTariffIds();
  return ids.map((id) => ({ tarrif: String(id) }));
}

export async function getPaymentRouteParams() {
  const ids = await fetchTariffIds();
  return ids.flatMap((id) =>
    PAYMENT_METHODS.map((paymentMethod) => ({
      tarrif: String(id),
      "payment-method": paymentMethod,
    })),
  );
}
