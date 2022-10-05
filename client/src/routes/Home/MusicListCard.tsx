import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { reccommendSongsState, userInfoState } from '../../Atom';
import SongCard from './SongCard';

interface recommendType {
  type: any;
}

const MusicListCard = (props: recommendType) => {
  const user = useRecoilValue(userInfoState);
  const type = props.type;
  const reccomendSongs = useRecoilValue(reccommendSongsState);
  const songList = reccomendSongs[type].slice(0, 5);
  const userKey = user.memberHighPitch;
  const BoxTitle =
    (type === 'fitList' && '내 고음에 맞는 추천곡') ||
    (type === 'highList' && '도전해 볼만한 추천곡') ||
    (type === 'lowList' && '편하게 부르는 추천곡');
  const navigate = useNavigate();
  return (
    <MusicBox>
      <BoxHeader
        onClick={() => {
          navigate(`/recommend/${type}`);
        }}>
        {BoxTitle}
        <p>+ 더보기</p>
      </BoxHeader>
      <BoxSongs>
        {songList.map((song: any, idx: number) => {
          return <SongCard key={idx} songData={song} userInfo={userKey} />;
        })}
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-family: 'omni035';
  box-sizing: border-box;
  border-bottom: 1px solid #929292;

  cursor: pointer;

  &:active {
    scale: 0.96;
    opacity: 0.8;
  }

  p {
    font-size: 10px;
    color: #929292;
  }
`;

const BoxSongs = styled.div`
  position: relative;
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: start;
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
