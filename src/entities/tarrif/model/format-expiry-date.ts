export function formatTarrifExpiryDate(
  periodMonths: number,
  from = new Date(),
): string {
  const date = new Date(from);
  date.setMonth(date.getMonth() + periodMonths);

  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatTarrifExpiryBadge(
  periodMonths: number,
  from = new Date(),
): string {
  const date = new Date(from);
  date.setMonth(date.getMonth() + periodMonths);

  const formatted = date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return `до ${formatted}`;
}
