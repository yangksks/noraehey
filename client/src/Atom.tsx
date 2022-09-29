import { atom } from 'recoil';

export const shortsListState = atom({
  key: 'shortsList',
  default: [],
});

export const userInfoState = atom({
  key: 'userInfo',
  default: [],
});
