import { useEffect, useMemo, useState } from 'react';
import { getRequest } from '../services/base-api';

export function useGetRequest<T>(url: string, options?: RequestInit) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);

    const controller = new AbortController();
    getRequest(url, {
      signal: controller.signal,
    })
      .then((data) => {
        setData(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setData(null);
        setLoading(false);
        setError(new Error(err));
      });

    return () => {
      controller.abort();
    };
  }, [url]);

  return useMemo(() => ({ loading, data, error }), [loading, data, error]);
}
