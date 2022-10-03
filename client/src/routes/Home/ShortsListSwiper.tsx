import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ShortsListCard from './ShortsListCard';
import { useRecoilValue } from 'recoil';
import { shortsListLengthState, shortsListState } from '../../Atom';

const ShortsCardSwiper = () => {
  const shortsLength = useRecoilValue(shortsListLengthState);
  const arr = Array.from({ length: shortsLength }, () => 0);

  return (
    <CardContainer>
      <Swiper
        slidesOffsetBefore={10}
        slidesOffsetAfter={10}
        slidesPerView={2.3}
        spaceBetween={10}
        className="mySwiper">
        {arr.map((a, idx) => (
          <SwiperSlide key={idx}>
            <ShortsListCard idx={idx} />
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
  }
`;
export default ShortsCardSwiper;
