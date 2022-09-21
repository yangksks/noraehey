import styled from 'styled-components';

const setScreenSize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};
setScreenSize();

const LandingPage = () => {
  return (
    <LandingContainer>
      <TitleBox>
        <LeftBox>
          <h1>노</h1>
          <h2>래</h2>
          <h3>해</h3>
        </LeftBox>
        <RightBox>
          <h1>
            당신이 부를수있는
            <br />
            최고의 노래를
            <br />
            찾아보세요
          </h1>
          <ImgBox src={'src/assets/images/coupleSinging.png'} />
        </RightBox>
      </TitleBox>
      <LoginBox>
        <KakaoButton src={'src/assets/images/kakaoLogin.png'} />
        <a>체험하기</a>
      </LoginBox>
    </LandingContainer>
  );
};

const LandingContainer = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background: linear-gradient(
    168.05deg,
    #a793ff 0%,
    #f4b9ee 55.13%,
    #ffe27d 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  gap: 30px;
`;

const TitleBox = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  box-sizing: border-box;
`;

const LeftBox = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-left: 30px;
  align-items: start;
  h1 {
    animation: fadeIn 2s forwards;
    font-size: 90px;
    color: white;
  }
  h2 {
    animation: fadeIn 3s forwards;
    padding: 0 25px;
    font-size: 90px;
    color: white;
  }
  h3 {
    animation: fadeIn 4s forwards;
    padding: 0 50px;
    font-size: 90px;
    color: white;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
      top: 30px;
    }
    100% {
      opacity: 1;
      top: -10px;
    }
  }
`;

const RightBox = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  h1 {
    animation: fadeIn 3s forwards;
    font-family: 'omni025';
    margin-top: 3px;
    font-size: 20px;
    color: white;
  }
`;

const ImgBox = styled.img`
  position: relative;
  top: 30px;
  width: 150%;
  margin-left: 20px;
  animation: fadeIn 4s forwards;
`;

const LoginBox = styled.div`
  width: 100%;
  gap: 20px;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  a {
    font-size: 14px;
    font-family: 'omni025';
    border-bottom: 0.5px solid;
    color: #575757;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
  }
`;

const KakaoButton = styled.img`
  width: 80%;
  cursor: pointer;
  &:active {
    scale: 0.95;
    opacity: 0.8;
  }
`;

export default LandingPage;
