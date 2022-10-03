import styled, { css } from 'styled-components';
import Container from '../../style/style';
import { IoClose } from 'react-icons/io5';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ShortsModalCard from './ShortsModalCard';
import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/api/api';
import { useLocation, useNavigate } from 'react-router';
import { useParams } from 'react-router';
import SubTitle from '../Common/SubTitle';
import { ImArrowLeft2 } from 'react-icons/im';
const ShortsDetailPage = () => {
  const { shortsId } = useParams();
  const [shortsData, setShortsData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetchData.get(`/api/v1/shorts/${shortsId}`).then((res) => {
      setShortsData(res.data);
    });
  }, []);

  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setScreenSize();
  window.addEventListener('resize', () => setScreenSize());

  return (
    <Container>
      <Shorts>
        <Title>
          <ImArrowLeft2
            size={30}
            color={'white'}
            onClick={() => {
              navigate(-1);
            }}
          />
        </Title>
        <ShortsModalCard shortsData={shortsData} />
      </Shorts>
    </Container>
  );
};
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px 20px;

  svg {
    cursor: pointer;
  }

  p {
    flex-shrink: 1;
    width: 100%;
    padding-left: 25px;
    font-size: 18px;
    font-weight: 700;
  }
`;
const Shorts = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #242424;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default ShortsDetailPage;
