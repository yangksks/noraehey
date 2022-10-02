import { atom } from 'recoil';

export interface userType {
  email: string;
  memberId: number;
  memberTagList: number[];
  nickName: string;
  profileUrl: string;
  songHighPitch: number;
}
export const shortsListState = atom({
  key: 'shortsList',
  default: [],
});

export const userInfoState = atom({
  key: 'userInfo',
  default: {} as userType,
});
