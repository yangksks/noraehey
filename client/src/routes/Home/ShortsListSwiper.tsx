import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ShortsListCard from './ShortsListCard';

const MusicCardSwiper = () => {
  return (
    <CardContainer>
      <Swiper
        slidesOffsetBefore={20}
        slidesOffsetAfter={20}
        slidesPerView={2.3}
        spaceBetween={10}
        className="mySwiper">
        <SwiperSlide>
          <ShortsListCard />
        </SwiperSlide>
        <SwiperSlide>
          <ShortsListCard />
        </SwiperSlide>
        <SwiperSlide>
          <ShortsListCard />
        </SwiperSlide>
        <SwiperSlide>
          <ShortsListCard />
        </SwiperSlide>
        <SwiperSlide>
          <ShortsListCard />
        </SwiperSlide>
      </Swiper>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  position: relative;
  width: 100%;
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
    transition: 0.3s;
  }
`;
export default MusicCardSwiper;
