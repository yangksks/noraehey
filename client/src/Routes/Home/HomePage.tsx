import styled from 'styled-components';
import MenuBar from '../Common/MenuBar';
import NavBar from '../Common/NavBar';
import MusicListCard from './MusicListCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './HomePage.css';

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding-bottom: calc(var(--vh, 1vh) * 15);
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Container2 = styled.div`
  width: 100%;
  height: 460px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  box-sizing: border-box;
`;

const HomePage = () => {
  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setScreenSize();
  window.addEventListener('resize', () => setScreenSize());

  return (
    <Container>
      <NavBar />
      <ContentBox>
        <Container2>
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
            <SwiperSlide>
              <MusicListCard />
            </SwiperSlide>
            <SwiperSlide>
              <MusicListCard />
            </SwiperSlide>
          </Swiper>
        </Container2>
      </ContentBox>
      <MenuBar />
    </Container>
  );
};

export default HomePage;
