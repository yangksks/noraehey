import styled from 'styled-components';
import Container from '../../style/style';

import 'swiper/css';
import ShortsModalCard from './ShortsModalCard';
import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/api/api';
import { useParams } from 'react-router';

const ShortsDetailPage = () => {
  const { shortsId } = useParams();
  const [shortsData, setShortsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getShorts();
  }, []);

  const getShorts = async () => {
    const result = await fetchData.get(`/api/v1/shorts/${shortsId}`);
    setShortsData(() => result.data);
    setLoading(false);
  };

  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setScreenSize();
  window.addEventListener('resize', () => setScreenSize());

  const render = () => {
    return (
      <Container>
        <Shorts>
          <ShortsModalCard shortsData={shortsData} />
        </Shorts>
      </Container>
    );
  };
  return loading ? null : render();
};

const Shorts = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #242424;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export default ShortsDetailPage;
