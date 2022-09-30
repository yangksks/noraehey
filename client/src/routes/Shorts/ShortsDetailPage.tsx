import styled from 'styled-components';
import Container from '../../style/style';
import { IoClose } from 'react-icons/io5';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
const ShortsDetailPage = () => {
  //api 호출
  const aa = [1, 2, 3, 4, 5];
  return (
    <Container>
      <Shorts>
        <Swiper
          centeredSlides={true}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}>
          <SwiperSlide>
            <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }}>
              <ShortsCard>
                <Profile>
                  <img
                    src="data:image/jpeg;base64,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"
                    alt=""
                  />
                  <div>
                    <p>바쿄</p>
                    <span>13분 전</span>
                  </div>
                </Profile>
                <Album>
                  <div>
                    <i></i>
                    <img
                      src="http://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/080/414/439/80414439_1395973335427_1_600x600.JPG"
                      alt=""
                    />
                  </div>
                </Album>
                <Content>뢍러ㅏㅁ어라더라</Content>
                <LikeHeart>
                  <div>
                    <AiFillHeart size={30} color={'#f47b73'}></AiFillHeart>
                    <p>123</p>
                  </div>
                </LikeHeart>
              </ShortsCard>
            </SwiperSlide>
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
      </Shorts>
    </Container>
  );
};

const Shorts = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 20px 0;
  display: flex;
  justify-content: center;
`;
const ShortsCard = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  border-radius: 20px;
  background: linear-gradient(
    153.96deg,
    #ebe7ff 5.39%,
    #ffffff 53.42%,
    #e9e4ff 98.54%
  );
`;

const Profile = styled.div`
  display: flex;
  width: 100%;
  padding: 15px;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  & > div {
    display: flex;
    flex-grow: 1;
    gap: 8px;
    align-items: center;
    & > span {
      font-size: 12px;
      color: ${(props) => props.theme.colors.textGray};
    }
  }
`;

const Album = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  div {
    position: relative;

    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      margin: 14px;
    }

    i {
      content: '';
      width: 228px;
      height: 228px;
      position: absolute;
      inset: 0;
      border-radius: 50%;
      padding: 8px;
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      mask: default;
      transition: 1s;
    }

    i::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 228px;
      height: 228px;
      background: ${(props) => props.theme.colors.gradientPurpleToYellow};
      transform: translate(-50%, -50%) rotate(45deg);
    }
    i:hover {
      transform: rotate(360deg);
    }

    @keyframes rotate {
      from {
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      to {
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 0;
  height: 100px;
`;

const LikeHeart = styled.div`
  display: flex;

  justify-content: flex-end;
  padding: 10px 20px;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    p {
      font-size: 10px;
    }
  }
`;
export default ShortsDetailPage;
