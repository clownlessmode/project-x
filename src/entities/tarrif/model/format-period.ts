const PERIOD_LABELS: Record<number, string> = {
  1: "1 месяц",
  3: "3 месяца",
  6: "6 месяцев",
  12: "12 месяцев",
};

export function formatTarrifPeriod(months: number): string {
  return PERIOD_LABELS[months] ?? `${months} мес.`;
}
