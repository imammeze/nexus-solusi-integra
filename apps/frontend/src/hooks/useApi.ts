'use client';

import { useState, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

/**
 * Generic hook for API calls with loading and error state management.
 * Usage:
 *   const { data, error, isLoading, execute } = useApi(fetchArticles);
 *   useEffect(() => { execute(1, 10); }, []);
 */
export function useApi<T, Args extends any[]>(
  apiFunction: (...args: Args) => Promise<T>,
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(
    async (...args: Args) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const data = await apiFunction(...args);
        setState({ data, error: null, isLoading: false });
        return data;
      } catch (err: any) {
        const errorMessage =
          err?.response?.data?.message || err?.message || 'Terjadi kesalahan';
        setState({ data: null, error: errorMessage, isLoading: false });
        throw err;
      }
    },
    [apiFunction],
  );

  const reset = useCallback(() => {
    setState({ data: null, error: null, isLoading: false });
  }, []);

  return { ...state, execute, reset };
}
