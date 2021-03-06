import { atom } from 'recoil';

export const userInfoState = atom<User | null>({
  key: 'userInfoState',
  default: null,
});
