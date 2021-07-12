import { postRequest, removeToken, saveToken } from './base-api';

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
