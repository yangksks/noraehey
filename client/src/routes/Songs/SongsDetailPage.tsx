import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import Container from '../../style/style';
import SubTitle from '../Common/SubTitle';
import AlbumImage from './AlbumImage';
import SongLyrics from './SongLyrics';
import SongBtnList from './SongBtnList';
import SongDetailShorts from './SongDetailShorts';
import SongInfo from './SongInfo';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { fetchData } from '../../utils/api/api';
interface SongType {
  songId: number;
  songTitle: string;
  songSinger: string;
  songHighPitch: number;
  songGenre: string;
  songAlbum: string;
  songImageUrl: string;
  songTj: string;
  songKy: string;
  songLikeCount: number;
  liked: boolean;
  songLevel: number;
  songEvalCount: number;
  myEval: number;
  songLyrics: string;
}
const SongsDetailPage = () => {
  const { songId } = useParams();
  const { pathname } = useLocation();
  const [songData, setSongData] = useState({} as SongType);

  useEffect(() => {
    fetchData.get(`/api/v1/song/info/${songId}`).then((res) => {
      setSongData(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const refetchFunc = () => {
    fetchData.get(`/api/v1/song/info/${songId}`).then((res) => {
      setSongData(res.data);
      console.log(res.data);
    });
  };
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
          liked={songData.liked}
          songLikeCount={songData.songLikeCount}></AlbumImage>
        <SongLyrics lyrics={songData.songLyrics}></SongLyrics>
        <SongInfo songData={songData}></SongInfo>
        <SongBtnList
          myEval={songData.myEval}
          refetchFunc={refetchFunc}></SongBtnList>
        <SongDetailShorts></SongDetailShorts>
      </Container>
    </>
  );
};

export default SongsDetailPage;
