import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { reccommendSongsState, userInfoState } from '../../Atom';
import SubTitle from '../Common/SubTitle';
import SongCard from './SongCard';

const RecommendSongsPage = () => {
  const url = useLocation().pathname.split('/')[2];
  const [urlNow, setUrlNow] = useState(url);
  const user = useRecoilValue(userInfoState);
  const userKey = user.memberHighPitch;
  const reccomendSongs = useRecoilValue(reccommendSongsState);
  const songList = reccomendSongs[url];

  useEffect(() => {
    setUrlNow(url);
  }, [url]);

  const BoxTitle =
    (urlNow === 'fitList' && '내 고음에 맞는 추천곡') ||
    (urlNow === 'highList' && '도전해 볼만한 추천곡') ||
    (urlNow === 'lowList' && '편하게 부를수 있는 추천곡');

  return (
    <RecommendContainer>
      <SubTitle title={BoxTitle || ''}></SubTitle>
      <BoxSongs>
        {songList.map((song: any, idx: number) => {
          return <SongCard key={idx} songData={song} userInfo={userKey} />;
        })}
      </BoxSongs>
    </RecommendContainer>
  );
};

const RecommendContainer = styled.div`
  position: relative;
  width: 100%;
  height: 10%;
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
  height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  border-radius: 20px;
  font-family: 'omni025';
  box-sizing: border-box;
`;

export default RecommendSongsPage;
