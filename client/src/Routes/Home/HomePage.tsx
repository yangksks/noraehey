import styled from 'styled-components';
import MenuBar from '../Common/MenuBar';
import NavBar from '../Common/NavBar';
import MusicCardSwiper from './MusicCardSwiper';

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
  background-color: tomato;
`;

const HomePage = () => {
  return (
    <Container>
      <NavBar />
      <ContentBox>
        <MusicCardSwiper />
      </ContentBox>
      <MenuBar />
    </Container>
  );
};

export default HomePage;
