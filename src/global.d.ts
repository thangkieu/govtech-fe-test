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

type AppModuleData = {
  photo: string;
  name: string;
  desc: string;
  title: string;
};

type FetchAppRespSuccess = {
  apps: AppModuleData[];
};

type User = {
  email: string;
  name: string;
  permissions: string[];
};
