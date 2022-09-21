import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import MagazineCardBig from './MagazineCardBig';
import MagazineCardSmall from './MagazineCardSmall';
import 'swiper/css';

const magazines = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const MagazineListSwiper = () => {
  return (
    <CardContainer>
      <Swiper
        slidesOffsetBefore={10}
        slidesOffsetAfter={10}
        slidesPerView={1.6}
        spaceBetween={10}
        className="mySwiper">
        {magazines.map((magazine, idx) => (
          <SwiperSlide key={`big${idx}`}>
            <MagazineCardBig />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        slidesOffsetBefore={10}
        slidesOffsetAfter={10}
        slidesPerView={3.3}
        spaceBetween={10}
        className="mySwiper">
        {magazines.map((magazine, idx) => (
          <SwiperSlide key={`small${idx}`}>
            <MagazineCardSmall />
          </SwiperSlide>
        ))}
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
    padding: 10px;
    box-sizing: border-box;
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
export default MagazineListSwiper;
