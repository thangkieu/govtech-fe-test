const API_URL =
  process.env.REACT_APP_BASE_API || process.env.STORYBOOK_BASE_API;

const request = (url: string, options: RequestInit) => {
  return fetch(`${API_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  }).then((resp) => {
    return resp.json();
  });
};

export const getRequest = (url: string) => request(url, { method: 'GET' });

export const postRequest = (url: string, data: any) =>
  request(url, { method: 'POST', body: JSON.stringify(data) });

export const getOTP = async (email: string) => {
  try {
    const resp: RequestOTPSuccess = await postRequest('/auth/get_otp_email', {
      email,
    });

    return resp;
  } catch (err) {
    console.log(err);
  }

  return null;
};

const TOKEN_KEY = 'access_token';
function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export const login = async (email: string, otp: number) => {
  try {
    const resp: FetchTokenRespSuccess = await postRequest(
      '/auth/get_jwt_token',
      {
        email,
        otp,
      }
    );

    saveToken(resp.jwt);

    return resp;
  } catch (err) {
    console.log(err);
    removeToken();
  }

  return null;
};

export const logout = () => {
  removeToken();
};
