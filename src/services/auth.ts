import { genRequest, removeToken, saveToken } from './base-api';

const API_URL: string =
  process.env.REACT_APP_BASE_API || process.env.STORYBOOK_BASE_API || '';

const authRequest = (url: string, options: RequestInit) => {
  return genRequest(API_URL, url, options);
};

export const getRequest = (url: string, options?: RequestInit) =>
  authRequest(url, { ...options, method: 'GET' });

export const postRequest = (url: string, data: any) =>
  authRequest(url, { method: 'POST', body: JSON.stringify(data) });

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

export const login = async (email: string, otp: number) => {
  try {
    const resp: FetchTokenRespSuccess = await postRequest(
      '/auth/get_jwt_token',
      {
        email,
        otp,
      }
    );

    if (!resp) throw Error('Error');

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
