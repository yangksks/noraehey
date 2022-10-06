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
    });
  }, []);

  if (shortsDatas.length != 0)
    return (
      <ShortsList>
        {shortsDatas.length != 0 &&
          shortsDatas.map((item, i) => (
            <LikeShortsCard key={i} shortsData={item}></LikeShortsCard>
          ))}
      </ShortsList>
    );
  else return <NoData>좋아요한 쇼츠가 없습니다.</NoData>;
};
const NoData = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.textGray};
`;
const ShortsList = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, minmax(auto, 300px));
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 10px;
`;

export default LikeShortsPage;
