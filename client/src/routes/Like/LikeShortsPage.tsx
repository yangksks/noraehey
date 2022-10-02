import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchData } from '../../utils/api/api';
import ShortsCard from './ShortsCard';
interface shortsListType {}
const LikeShortsPage = () => {
  const [songDatas, setSongDatas] = useState<[]>([]);
  useEffect(() => {
    fetchData.get('/api/v1/shorts/like?page=0').then((res) => {
      // setSongDatas(res.data.songEntityResList);
      console.log(res.data.shortsList);
    });
  }, []);
  const userInfo = {
    key: 19,
  };

  return (
    <ShortsList>
      {/* <ShortsCard songData={songData[0]}></ShortsCard> */}
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
