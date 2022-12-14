import styled from 'styled-components';
import MusicCardSwiper from './MusicCardSwiper';
import ShortsListSwiper from './ShortsListSwiper';
import ShortsHotListSwiper from './ShortsHotListSwiper';
import { BsCollectionPlay } from 'react-icons/bs';
import { GrArticle } from 'react-icons/gr';
import { MdLocalFireDepartment } from 'react-icons/md';
import MagazineListSwiper from './MagazineListSwiper';

const HomePage = () => {
  
  return (
    <Container>
      <ContentBox>
        <MusicCardSwiper />
        <FeatTitle>
          <BsCollectionPlay />
          HEY쇼츠
        </FeatTitle>
        <ShortsListSwiper />
        <FeatTitle>
          <MdLocalFireDepartment />
          HEY쇼츠 Top20
        </FeatTitle>
        <ShortsHotListSwiper />
        <FeatTitle>
          <GrArticle />
          매거진
        </FeatTitle>
        <MagazineListSwiper />
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  z-index: 100;
`;

const FeatTitle = styled.h1`
  width: 100%;
  font-size: 22px;
  margin: 10px;
  padding-left: 20px;
  font-family: 'omni035';
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 5px;

  svg {
    font-size: 28px;
    padding-bottom: 4px;
  }
`;

const Loader = styled.div`
  body {
    transition: 0s !important;
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -ms-transition: none !important;
    -o-transition: none !important;
  }
`;

export default HomePage;
