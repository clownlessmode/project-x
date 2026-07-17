"use client";

import { tariffFromDTO } from "@entities/tarrif/model/from-dto";
import type { TarrifModel } from "@entities/tarrif/model/types";
import { api } from "@shared/api/client";
import { useCallback, useEffect, useState } from "react";

export function useTariffs() {
  const [tariffs, setTariffs] = useState<TarrifModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await api.listTariffs();
      setTariffs(items.map(tariffFromDTO));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось загрузить тарифы");
      setTariffs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { tariffs, loading, error, reload };
}

export function useTarrifById(id: number | null) {
  const [tarrif, setTarrif] = useState<TarrifModel | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id == null) {
      setTarrif(null);
      setLoading(false);
      setError(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    void api
      .getTariff(id)
      .then((dto) => {
        if (!cancelled) {
          setTarrif(tariffFromDTO(dto));
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Тариф не найден");
          setTarrif(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { tarrif, loading, error };
}
