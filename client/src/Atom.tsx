import { atom } from 'recoil';

export const shortsListState = atom({
  key: 'shortsList',
  default: [
    {
      likeCount: 0,
      liked: false,
      memberId: -1,
      memberNickname: '',
      memberProfileUrl: '',
      shortsAudioUrl: '',
      shortsComment: '',
      shortsCreateTime: '',
      shortsId: -1,
      songHighPitch: 0,
      songId: 0,
      songImageUrl: '',
      songKy: '',
      songSinger: '',
      songTitle: '',
      songTj: '',
    },
  ],
});

export const shortsListLengthState = atom({
  key: 'shortsLength',
  default: 0,
});

export const myshortsListState = atom({
  key: 'myshortsList',
  default: [
    {
      likeCount: 0,
      liked: false,
      memberId: -1,
      memberNickname: '',
      memberProfileUrl: '',
      shortsAudioUrl: '',
      shortsComment: '',
      shortsCreateTime: '',
      shortsId: -1,
      songHighPitch: 0,
      songId: 0,
      songImageUrl: '',
      songKy: '',
      songSinger: '',
      songTitle: '',
      songTj: '',
    },
  ],
});

export const userInfoState = atom({
  key: 'userInfo',
  default: {
    email: '',
    memberId: -1,
    memberTagList: [],
    nickName: '',
    profileUrl: '',
    songHighPitch: 0,
  },
});
