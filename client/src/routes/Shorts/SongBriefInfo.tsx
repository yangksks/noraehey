import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchData } from '../../utils/api/api';

const SongBriefInfo = () => {
  const [songInfo, setSongInfo] = useState({} as any);
  const locate = useLocation();

  useEffect(() => {
    getSongInfo();
  }, []);

  const getSongInfo = async () => {
    const songId = locate.pathname.split('/')[3];
    const URL = '/api/v1/song/info/';
    try {
      const result = await fetchData.get(URL + `${songId}`);
      setSongInfo(result.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <SongInfoContainer>
      <img src={songInfo.songImageUrl} alt="" />
      <p>
        {songInfo.songTitle} - {songInfo.songSinger}
      </p>
      <p>{songInfo.songAlbum}</p>
    </SongInfoContainer>
  );
};

const SongInfoContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: lavender;
  position: flex;
  flex: row;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
  }
`;

export default SongBriefInfo;
