const API_URL: string =
  process.env.REACT_APP_BASE_API || process.env.STORYBOOK_BASE_API || '';

const TOKEN_KEY = 'access_token';
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export const genRequest = (
  baseAPI: string,
  url: string,
  options: RequestInit
) => {
  const token = getToken();

  return fetch(`${baseAPI}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
    ...options,
  }).then((resp) => {
    return resp.json();
  });
};

const authRequest = (url: string, options: RequestInit) => {
  return genRequest(API_URL, url, options);
};

export const getRequest = (url: string, options?: RequestInit) =>
  authRequest(url, { ...options, method: 'GET' });

export const postRequest = (url: string, data: any) =>
  authRequest(url, { method: 'POST', body: JSON.stringify(data) });
