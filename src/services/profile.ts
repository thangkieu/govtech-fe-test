import { genRequest } from './base-api';

const PROFILE_API: string = process.env.REACT_APP_PROFILE_API || '';

const profileRequest = (url: string, options: RequestInit) => {
  return genRequest(PROFILE_API, url, options);
};

export const getProfileRequest = (url: string, options?: RequestInit) =>
  profileRequest(url, { ...options, method: 'GET' });

export const postProfileRequest = (
  url: string,
  data: any,
  options: RequestInit = {}
) =>
  profileRequest(url, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });

export const getUserInfo = async (signalToAbort?: AbortSignal) => {
  try {
    const resp = await getProfileRequest(
      '/profiles/test_jwt',
      signalToAbort
        ? {
            signal: signalToAbort,
          }
        : undefined
    );

    return resp;
  } catch (error) {
    return null;
  }
};
