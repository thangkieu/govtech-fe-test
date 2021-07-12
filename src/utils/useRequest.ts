import { useEffect, useMemo, useState } from 'react';
import { getRequest } from '../services/base-api';
import { postProfileRequest } from '../services/profile';

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
  }, [url]);

  return useMemo(() => ({ loading, data, error }), [loading, data, error]);
}

export function useAuthRequest<T>(url: string, options?: RequestInit) {
  return useRequest<T>(getRequest, url, options);
}
