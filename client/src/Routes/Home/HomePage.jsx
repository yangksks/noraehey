import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.bgColor};
`;

const Box2 = styled.div`
  position: fixed;
  width: 100%;
  bottom: -100px;
  height: calc(var(--vh, 1vh) * 30);
  background-color: ${(props) => props.bgColor};
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
      <Box bgColor="#cf6a87">
        <h1>안녕하세요</h1>
        <h1>안녕하세요</h1>
        <h1>안녕하세요</h1>
        <h1>안녕하세요</h1>
        <h1>안녕하세요</h1>
        <h1>안녕하세요</h1>
        <h1>안녕하세요</h1>
        <h1>안녕하세요</h1>
        <h1>안녕하세요</h1>
        <h1>안녕하세요</h1>
        <h1>안녕하세요</h1>
        <h1>안녕하세요</h1>
        <h1>안녕하세요</h1>
        <h1>안녕하세요</h1>
        <h1>안녕하세요</h1>
        <h1>안녕하세요</h1>
      </Box>
      <Box2 bgColor="#6c6acf">메뉴</Box2>
    </Container>
  );
};

export default Home;
