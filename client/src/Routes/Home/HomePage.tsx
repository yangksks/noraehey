import styled from 'styled-components';
import { MenuBar } from '../Common/MenuBar';
import { NavBar } from '../Common/NavBar';

const Box = styled.div<{ bgColor: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: calc(var(--vh, 1vh) * 15);
  padding-bottom: calc(var(--vh, 1vh) * 15);
  min-height: calc(var(--vh, 1vh) * 80);
  background-color: ${(props) => props.bgColor};
`;

const Box3 = styled.div`
  width: 100px;
  height: 100px;
  background-color: tomato;
  border: black solid 1px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
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
      <Box bgColor={'#cf6a87'}>
        <Box3>희진아 안녕</Box3>
        <Box3>혜성아 안녕</Box3>
        <Box3>민서야 안녕</Box3>
        <Box3>경섭아 안녕</Box3>
        <Box3>민호야 안녕</Box3>
        <Box3>3팀화이팅</Box3>
        <Box3>1</Box3>
        <Box3>1</Box3>
        <Box3>1</Box3>
        <Box3>1</Box3>
        <Box3>1</Box3>
        <Box3>1</Box3>
        <Box3>1</Box3>
        <Box3>1</Box3>
        <Box3>1</Box3>
        <Box3>1</Box3>
        <Box3>1</Box3>

      </Box>
      <MenuBar />
    </Container>
  );
};

export default HomePage;
