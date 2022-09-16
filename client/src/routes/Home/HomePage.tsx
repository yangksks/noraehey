import styled from 'styled-components';
import MusicCardSwiper from './MusicCardSwiper';

const HomePage = () => {
  return (
    <Container>
      <ContentBox>
        <MusicCardSwiper />
      </ContentBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  max-width: 420px;
  padding-bottom: 100px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  z-index: 100;
`;

export default HomePage;
