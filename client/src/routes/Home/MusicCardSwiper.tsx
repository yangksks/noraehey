import styled from 'styled-components';
import MusicListCard from './MusicListCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import 'swiper/css';

const MusicCardSwiper = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (
    <CardContainer status={loading}>
      <Swiper
        slidesPerView={1.3}
        centeredSlides={true}
        spaceBetween={30}
        className="mySwiper">
        <SwiperSlide>
          <MusicListCard />
        </SwiperSlide>
        <SwiperSlide>
          <MusicListCard />
        </SwiperSlide>
        <SwiperSlide>
          <MusicListCard />
        </SwiperSlide>
        <SwiperSlide>
          <MusicListCard />
        </SwiperSlide>
      </Swiper>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ status: boolean }>`
  position: relative;
  width: 100%;
  aspect-ratio: 0.77;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    width: 60%;
    transition: ${({ status }) => (status ? '0s' : '0.3s')};
  }

  .swiper-slide-active {
    scale: 1.05;
    transition: ${({ status }) => (status ? '0s' : '0.3s')};
  }

  .swiper-slide-prev div,
  .swiper-slide-next div {
    background-color: #e6e6e6;
    transition: ${({ status }) => (status ? '0s' : '0.6s')};
  }
`;
export default MusicCardSwiper;
