import styled from 'styled-components';
import LikeSongCard from './LikeSongCard';
import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/api/api';

interface songListType {
  songId: number;
  songTitle: string;
  songSinger: string;
  songImageUrl: string;
  songTj: string;
  songKy: string;
  songHighPitch: number;
}
const LikeSongPage = () => {
  const [songDatas, setSongDatas] = useState<songListType[]>([]);
  useEffect(() => {
    fetchData.get('/api/v1/song/like?page=0').then((res) => {
      setSongDatas(res.data.songEntityResList);
    });
  }, []);
  return (
    <SongList>
      {songDatas.length != 0 &&
        songDatas.map((item, i) => <LikeSongCard key={i} songData={item} />)}
    </SongList>
  );
};
const SongList = styled.div`
  width: 100%;
`;

export default LikeSongPage;
