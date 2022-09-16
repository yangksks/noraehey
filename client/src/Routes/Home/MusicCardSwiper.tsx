import styled from 'styled-components';
import MusicListCard from './MusicListCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
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

  .swiper-slide-active {
    scale: 1.08;
    transition: 0.3s;
  }

  .swiper-slide-prev div,
  .swiper-slide-next div {
    background-color: hsla(0, 0%, 44%, 0.104);
    transition: 0.6s;
  }

`;

const MusicCardSwiper = () => {
  return (
    <CardContainer>
      <Swiper
        slidesPerView={1.3}
        centeredSlides={true}
        spaceBetween={30}
        className="mySwiper">
        <SwiperSlide>
          <MusicListCard />
        </SwiperSlide>
      </Swiper>
    </CardContainer>
  );
};

export default MusicCardSwiper;
