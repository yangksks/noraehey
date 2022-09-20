import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import Container from '../../style/style';
import SubTitle from '../Common/SubTitle';
import AlbumImage from './AlbumImage';
import SongLyrics from './SongLyrics';
import SongBtnList from './SongBtnList';
import SongDetailShorts from './SongDetailShorts';
// import { fetchData } from '../../utils/api/api';
import SongInfo from './SongInfo';
import { useParams } from 'react-router-dom';
export type SongType = {
  songId: number;
  songName: string;
};
const SongsDetailPage = () => {
  const { songId } = useParams();
  const [songData, setSongData] = useState({
    songTitle: '눈의 꽃',
    songSinger: '박효신',
    songAlbum: '미안하다 사랑한다 ost',
    songHighPitch: '2옥 시',
    songGenre: '국내드라마',
    songImageUrl:
      'https://cdnimg.melon.co.kr/cm/album/images/000/43/841/43841_500.jpg/melon/resize/282/quality/80/optimize',
    songTj: 12345,
    songKy: 67890,
    isLiked: false,
    songLevel: 2,
    songLikeCount: 12311,
    songEvalCount: 52,
    songLyrics:
      '어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n',
  });

  // fetchData.get('api/').then((data:any)=>{
  //   console.log(data)
  // })

  return (
    <>
      <Helmet>
        <title>노래 상세 | 노래Hey</title>
      </Helmet>
      <SubTitle title="노래 상세" />
      <Container>
        <AlbumImage
          url={songData.songImageUrl}
          songTj={songData.songTj}
          songKy={songData.songKy}
          isLiked={songData.isLiked}></AlbumImage>
        <SongLyrics lyrics={songData.songLyrics}></SongLyrics>
        <SongInfo songData={songData}></SongInfo>
        <SongBtnList></SongBtnList>
        <SongDetailShorts></SongDetailShorts>
      </Container>
    </>
  );
};

export default SongsDetailPage;
