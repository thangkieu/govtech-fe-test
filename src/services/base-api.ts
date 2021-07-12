import { notify } from '../utils/notification';

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
  const { headers, ...restOtp } = options || {};

  return fetch(`${baseAPI}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...restOtp,
  })
    .then((resp) => {
      if (resp.status < 200 || resp.status >= 300) {
        resp.json().then((error: RespError) => {
          let message: string = '';
          if (typeof error.detail === 'string') {
            message = error.detail;
          } else if (error.detail?.length > 0) {
            message = error.detail.map((i) => i.msg).join('\n');
          }
          notify.error(message);
        });

        throw Error('');
      }

      if (
        headers &&
        (headers as any)?.['Content-Type'] !== 'application/json'
      ) {
        return resp;
      }

      return resp.json();
    })
    .catch((err) => {
      if (err.message) notify.error(err.message);
    });
};
