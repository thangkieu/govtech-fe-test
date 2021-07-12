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

type Milestone = {
  step: number;
  label: string;
};

type StaffFetcherData = {
  emails?: string[];
  emp_nums?: string[];
};

type FetchProfilesData = {
  'Display Name': string;
  Email: string;
  'Employee Number': string;
  'Org Chain': string;
  Manager: string;
  'Reporting Officer': string;
  'Employee Group': string;
  'HQ/SVC': string;
  Division: string;
  Dept: string;
  large_div: string;
  username: string;
  groupname: string;
};

type FetchProfileDataResp = {
  profiles: FetchProfilesData[];
  missing_emails: string[];
  missing_emp_nums: string[];
};
