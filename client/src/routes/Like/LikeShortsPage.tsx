import styled from 'styled-components';
import SongCard from '../Home/SongCard';
const LikeShortsPage = () => {
  const songData = {
    URL: 'http://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/080/414/439/80414439_1395973335427_1_600x600.JPG',
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
      <SongCard songData={songData} userInfo={userInfo} />
    </ShortsList>
  );
};
const ShortsList = styled.div`
  width: 100%;
`;
export default LikeShortsPage;
