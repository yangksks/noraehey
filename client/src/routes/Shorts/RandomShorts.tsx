import styled, { css } from 'styled-components';
import Container from '../../style/style';
import { IoClose } from 'react-icons/io5';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from 'react';
import ShortsDetailCard from './ShortsDetailCard';
import { useRecoilValue } from 'recoil';
import { shortsListState } from '../../Atom';
import { fetchData } from '../../utils/api/api';
import { shortsDetailType } from './ShortsDetailCard';

const RandomShorts = () => {
  const [shortsDatas, setShortsDatas] = useState<shortsDetailType[]>([]);
  const [nowIndex, setNowIndex] = useState(-1);
  // const shortsDatas = useRecoilValue(shortsListState);
  const [audio, setAudio] = useState(new Audio());
  const [play, setPlay] = useState(false);

  useEffect(() => {
    fetchData.get('/api/v1/shorts/random').then((res) => {
      setShortsDatas(res.data);
      setNowIndex(0);
    });
  }, []);

  useEffect(() => {
    if (nowIndex != -1) {
      setAudio(new Audio(shortsDatas[nowIndex].shortsAudioUrl));
    }
  }, [nowIndex]);

  useEffect(() => {
    play ? audio.play() : audio.pause();
  }, [play]);
  return (
    <Container>
      <Shorts>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onActiveIndexChange={(swiper) => {
            setNowIndex(swiper.realIndex);
          }}>
          {shortsDatas.map((item, i) => (
            <SwiperSlide
              key={i}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <ShortsDetailCard
                key={i}
                shortsData={item}
                play={play}
                setPlay={setPlay}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Shorts>
    </Container>
  );
};

const Shorts = styled.div`
  width: 100%;
  background-color: #242424;
  padding: 20px 0;
  display: flex;
  justify-content: center;
`;

export default RandomShorts;
