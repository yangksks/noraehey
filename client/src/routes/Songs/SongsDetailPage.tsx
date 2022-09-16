import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import Container from "../../style/style"
import SubTitle from '../Common/SubTitle';
import AlbumImage from './AlbumImage';

export type SongType =  {
  songId: number,
  songName: string,
}
const SongsDetailPage = () => {
  const [songData, setSongData] = useState({
    songTitle: "눈의 꽃",
    songSinger: "박효신",
    songHighPitch: "2옥시",
    songGenre: "국내드라마",
    songImageUrl: "https://cdnimg.melon.co.kr/cm/album/images/000/43/841/43841_500.jpg/melon/resize/282/quality/80/optimize",
    songTj: 12345,
    songKy: 67890,
    songLike: 100000,
    songLevel: 2,
  });
  
  return (<>
    <Helmet>
      <title>노래 상세 | 노래Hey</title>
    </Helmet>
    <SubTitle title="노래 상세" link='/'/>
    <Container>
      <AlbumImage url={songData.songImageUrl}></AlbumImage>
      {/* <SongLylics></SongLylics>
      <SongInfo></SongInfo>
      <SongBtn></SongBtn>
      <SongShorts></SongShorts> */}
    </Container>
    </>
  )
}

const Title=styled.div`
  
`

export default SongsDetailPage