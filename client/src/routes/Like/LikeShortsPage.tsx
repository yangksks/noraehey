import styled from 'styled-components';
import LikeShortsCard from './LikeShortsCard';
import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/api/api';

interface shortsListType {
  shortsId: number;
  shortsComment: string;
  shortsAudioUrl: string;
  shortsCreateTime: string;
  songId: number;
  songTitle: string;
  songSinger: string;
  songHighPitch: number;
  songImageUrl: string;
  songTj: string;
  songKy: string;
  memberId: number;
  memberNickname: string;
  memberProfileUrl: string;
  likeCount: number;
  isLiked: boolean;
}
const LikeShortsPage = () => {
  const [shortsDatas, setShortsDatas] = useState<shortsListType[]>([]);
  useEffect(() => {
    fetchData.get('/api/v1/shorts/like?page=0').then((res) => {
      setShortsDatas(res.data.shortsList);
      console.log(res.data.shortsList);
    });
  }, []);

  return (
    <ShortsList>
      {shortsDatas.length != 0 &&
        shortsDatas.map((item, i) => (
          <LikeShortsCard key={i} shortsData={item}></LikeShortsCard>
        ))}
    </ShortsList>
  );
};
const ShortsList = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, minmax(auto, 300px));
  grid-template-rows: repeat(auto-fill, 1fr);
  /* grid-auto-rows: auto; */
  gap: 10px;
`;

export default LikeShortsPage;
