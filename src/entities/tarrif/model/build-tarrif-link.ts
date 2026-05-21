import type { TarrifModel } from "./types";

export function buildTarrifLink(
  pathname: string,
  { id }: Pick<TarrifModel, "id">,
): string {
  const base = pathname.replace(/\/$/, "");

  return `${base}/${id}`;
}
