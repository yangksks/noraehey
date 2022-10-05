import styled from 'styled-components';
import LikeSongCard from './LikeSongCard';
import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/api/api';
import SongCard from '../Home/SongCard';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../Atom';
// interface songListType {
//   songId: number;
//   songTitle: string;
//   songSinger: string;
//   songImageUrl: string;
//   songTj: string;
//   songKy: string;
//   songHighPitch: number;
// }

interface songsType {
  songHighPitch: 0;
  songId: -1;
  songImageUrl: '';
  songKy: '';
  songSinger: '';
  songTitle: '';
  songTj: '';
}
const LikeSongPage = () => {
  const [songDatas, setSongDatas] = useState<songsType[]>([]);
  const userKey = useRecoilValue(userInfoState).memberHighPitch;
  useEffect(() => {
    fetchData.get('/api/v1/song/like?page=0').then((res) => {
      setSongDatas(res.data.songEntityResList);
    });
  }, []);
  if (songDatas.length != 0)
    return (
      <SongList>
        {songDatas.length != 0 &&
          songDatas.map((item, i) => (
            <SongCard key={i} songData={item} userInfo={userKey} />
          ))}
      </SongList>
    );
  else return <NoData>좋아요한 노래가 없습니다.</NoData>;
};
const NoData = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.textGray};
`;

const SongList = styled.div`
  width: 100%;
`;

export default LikeSongPage;
