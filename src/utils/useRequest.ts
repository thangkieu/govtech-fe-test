import { useEffect, useMemo, useState } from 'react';

const API_URL =
  process.env.REACT_APP_API_URL ||
  'https://nomination-server-assignment.herokuapp.com/api';

export function useGetRequest<T>(url: string, options?: RequestInit) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);

    const controller = new AbortController();
    fetch(`${API_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    })
      .then((resp) => {
        return resp.json();
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
