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

export const shortsHotListState = atom({
  key: 'shortsHotList',
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

export const shortsHotListLengthState = atom({
  key: 'shortsHotLength',
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
    memberEmail: '',
    memberId: -1,
    memberTagList: [],
    memberNickname: '',
    memberProfileUrl: '',
    memberHighPitch: 0,
  },
});

export const userTagListState = atom({
  key: 'userTagList',
  default: [
    {
      tagId: -1,
      tagName: '',
    },
  ],
});

export const tagListState = atom({
  key: 'tagList',
  default: [
    {
      tagId: -1,
      tagName: '',
    },
  ],
});

interface songsType {
  songHighPitch: 0;
  songId: -1;
  songImageUrl: '';
  songKy: '';
  songSinger: '';
  songTitle: '';
  songTj: '';
}

interface userType {
  [key: string]: Array<songsType>;
}

export const reccommendSongsState = atom<userType>({
  key: 'reccommendSongs',
  default: {
    lowList: [],
    fitList: [],
    highList: [],
  },
});
