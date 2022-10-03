import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const setScreenSize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};
setScreenSize();
window.addEventListener('resize', () => setScreenSize());

const VoiceResultPage = () => {
  const navigate = useNavigate();

  return (
    <ResultContainer>
      <p>결과페이지</p>
      <button onClick={() => navigate('/voice')}>재측정하기</button>
      <button onClick={() => navigate('/')}>노래Hey로 떠나기</button>
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

export default VoiceResultPage;
