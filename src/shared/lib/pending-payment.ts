const STORAGE_KEY = "project-x:pending-payment";

export type PendingPayment = {
  paymentId: string;
  payUrl?: string;
  tariffId: number;
};

export function savePendingPayment(data: PendingPayment) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function readPendingPayment(): PendingPayment | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as PendingPayment;
  } catch {
    return null;
  }
}

export function clearPendingPayment() {
  sessionStorage.removeItem(STORAGE_KEY);
}
