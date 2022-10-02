import styled from 'styled-components';
import ShortsCard from './ShortsCard';
import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/api/api';

interface shortsListType {
  email: string;
  memberId: number;
  nickName: string;
  profileUrl: string;
  songHighPitch: number;
}
const LikeShortsPage = () => {
  const [shortsDatas, setShortsDatas] = useState<shortsListType[]>([]);
  useEffect(() => {
    fetchData.get('/api/v1/shorts/like?page=0').then((res) => {
      setShortsDatas(res.data.shortsList);
    });
  }, []);

  return (
    <ShortsList>
      {shortsDatas.length != 0 &&
        shortsDatas.map((item, i) => (
          <ShortsCard key={i} songData={item}></ShortsCard>
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
