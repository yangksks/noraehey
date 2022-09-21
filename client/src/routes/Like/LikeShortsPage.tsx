import styled from 'styled-components';
import ShortsCard from './ShortsCard';
const LikeShortsPage = () => {
  const songData = {
    albumUrl:
      'http://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/080/414/439/80414439_1395973335427_1_600x600.JPG',
    title: '야생화',
    artist: '박효신',
    tj: 23467,
    ky: 65413,
    key: 20,
  };

  const userInfo = {
    key: 19,
  };

  return (
    <ShortsList>
      <ShortsCard albumUrl={songData.albumUrl}></ShortsCard>
      <ShortsCard albumUrl={songData.albumUrl}></ShortsCard>
      <ShortsCard albumUrl={songData.albumUrl}></ShortsCard>
      <ShortsCard albumUrl={songData.albumUrl}></ShortsCard>
      <ShortsCard albumUrl={songData.albumUrl}></ShortsCard>
      <ShortsCard albumUrl={songData.albumUrl}></ShortsCard>
      <ShortsCard albumUrl={songData.albumUrl}></ShortsCard>
      <ShortsCard albumUrl={songData.albumUrl}></ShortsCard>
      <ShortsCard albumUrl={songData.albumUrl}></ShortsCard>
      <ShortsCard albumUrl={songData.albumUrl}></ShortsCard>
      <ShortsCard albumUrl={songData.albumUrl}></ShortsCard>
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
