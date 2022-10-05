import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../../Atom';
import { keyList } from '../../utils/constants/constants';
import { FiArrowLeft } from 'react-icons/fi';
import { fetchData } from '../../utils/api/api';
import { useEffect } from 'react';

const setScreenSize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};
setScreenSize();
window.addEventListener('resize', () => setScreenSize());

const VoiceResultPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userInfoState);

  const updateUserInfo = async () => {
    const URL = '/api/v1/member/info';
    try {
      const result = await fetchData.get(URL);
      setUser(() => result.data);
      return result.data;
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    updateUserInfo();
  }, []);

  return (
    <ResultContainer>
      <Footer onClick={() => navigate('/voice')}>
        <FiArrowLeft />
        <p>재측정하기</p>
      </Footer>
      <Title>
        <p className={'resultTitle1'}>측정결과</p>
        <p className={'resultTitle2'}>{keyList[user.memberHighPitch]}</p>
        <Button onClick={() => navigate('/')}>
          <p>노래Hey로 떠나기</p>
        </Button>
      </Title>
    </ResultContainer>
  );
};

const ResultContainer = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background: ${(props) => props.theme.colors.gradientPurpleToYellow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  position: relative;
  width: 100%;
  height: 80%;
  max-width: 420px;
  font-size: 20px;
  font-family: 'omni035';
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 40px;
  .resultTitle1 {
    font-size: 40px;
    text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
  }
  .resultTitle2 {
    background: linear-gradient(
      #ad24b9 0%,
      rgba(159, 16, 209, 0.63) 52.08%,
      rgba(87, 26, 219, 0.82849) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    top: -20px;
    font-size: 60px;
    animation: fadeIn2 1s ease-in forwards;
  }
  @keyframes fadeIn2 {
    0% {
      opacity: 0;
    }
    100% {
      scale: 1.5;
      top: 0px;
      opacity: 1;
    }
  }
`;

const Footer = styled.div`
  position: absolute;
  top: 10px;
  font-size: 20px;
  width: 100%;
  height: 20%;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  font-family: 'omni025';
  text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
  svg {
    position: relative;
  }
  z-index: 10;
`;

const Button = styled.div`
  gap: 20px;
  padding: 15px;
  font-size: 20px;
  color: #707070;
  border-radius: 30px;
  background: linear-gradient(
    107.48deg,
    #e3e1e1 2.51%,
    #d6f7f5 49.99%,
    #fbe0ff 94.21%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:active {
    scale: 0.95;
    opacity: 0.8;
  }
  &:hover {
    scale: 1.04;
  }
`;

export default VoiceResultPage;
