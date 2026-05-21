import type { TarrifModel } from "./types";

export function getTarrifById(
  id: number,
  tarrifs: readonly TarrifModel[],
): TarrifModel | undefined {
  return tarrifs.find((tarrif) => tarrif.id === id);
}
