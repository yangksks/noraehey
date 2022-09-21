import styled from 'styled-components';
import SongCard from './SongCard';

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

const MusicListCard = () => {
  return (
    <MusicBox>
      <BoxHeader>음악 추천 리스트</BoxHeader>
      <BoxSongs>
        <SongCard songData={songData} userInfo={userInfo} />
        <SongCard songData={songData} userInfo={userInfo} />
        <SongCard songData={songData} userInfo={userInfo} />
        <SongCard songData={songData} userInfo={userInfo} />
        <SongCard songData={songData} userInfo={userInfo} />
      </BoxSongs>
    </MusicBox>
  );
};

const BoxHeader = styled.div`
  position: relative;
  width: 100%;
  height: 10%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  font-size: 18px;
  font-family: 'omni035';
  box-sizing: border-box;
`;

const BoxSongs = styled.div`
  position: relative;
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  border-radius: 20px;
  font-family: 'omni025';
  box-sizing: border-box;
`;

const MusicBox = styled.div`
  width: 100%;
  height: 90%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  transition: 0.6s;
`;

export default MusicListCard;
