import { useEffect, useMemo, useState } from 'react';
import { getRequest } from '../services/auth';

export function useRequest<T>(
  request: any,
  url: string,
  options?: RequestInit
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);

    const controller = new AbortController();
    request(url, {
      signal: controller.signal,
    })
      .then((data: T) => {
        setData(data);
        setLoading(false);
        setError(null);
      })
      .catch((err: any) => {
        setData(null);
        setLoading(false);
        setError(new Error(err));
      });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return useMemo(() => ({ loading, data, error }), [loading, data, error]);
}

export function useAuthRequest<T>(url: string, options?: RequestInit) {
  return useRequest<T>(getRequest, url, options);
}
