import { genRequest } from './base-api';

const PROFILE_API: string = process.env.REACT_APP_PROFILE_API || '';

const profileRequest = (url: string, options: RequestInit) => {
  return genRequest(PROFILE_API, url, options);
};

export const getRequest = (url: string, options?: RequestInit) =>
  profileRequest(url, { ...options, method: 'GET' });

export const postRequest = (url: string, data: any) =>
  profileRequest(url, { method: 'POST', body: JSON.stringify(data) });

export const getUserInfo = async () => {
  try {
    const resp = await getRequest('/profiles/test_jwt');

    return resp;
  } catch (error) {
    return null;
  }
};
