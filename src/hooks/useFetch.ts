import { useState, useEffect, useCallback } from "react";
import { FetchState } from "../types";

const useFetch = <T>(
  fetchFn: () => Promise<T>,
  deps: any[] = [],
): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    execute();
  }, [execute]);
  return { data, loading, error, refetch: execute };
};

export default useFetch;
