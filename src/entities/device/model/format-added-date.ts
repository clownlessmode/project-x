export function formatDeviceAddedDate(date: Date): string {
  const formatted = date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return `Добавлен: ${formatted}`;
}
