// mobile | desktop
type BerakPoints = 'lg';

type RespErrorDetail = {
  msg: string;
  type: string;
};

type RespError = {
  detail: string | RespErrorDetail[];
};

type FetchTokenRespSuccess = {
  jwt: string;
};

type RequestOTPSuccess = {
  message: string;
};
