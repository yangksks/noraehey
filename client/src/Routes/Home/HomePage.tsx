import styled from 'styled-components';

const Box = styled.div<{ bgColor: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: calc(var(--vh, 1vh) * 80);
  background-color: ${(props) => props.bgColor};
`;

const Box2 = styled.div<{ bgColor: string }>`
  position: fixed;
  width: 100%;
  bottom: 0;
  height: calc(var(--vh, 1vh) * 20);
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

const Home = () => {
  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  setScreenSize();

  window.addEventListener('resize', () => setScreenSize());
  return (
    <Container>
      <Box bgColor={'#cf6a87'}>
        <Box3>1</Box3>
        <Box3>1</Box3>
        <Box3>1</Box3>
        <Box3>1</Box3>
        <Box3>1</Box3>
        <Box3>1</Box3>
        <Box3>1</Box3>
        <Box3>1</Box3>
      </Box>
      <Box2 bgColor={'#6c6acf'}>메뉴</Box2>
    </Container>
  );
};

export default Home;
