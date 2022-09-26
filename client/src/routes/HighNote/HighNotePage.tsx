import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import VoiceButton from './VoiceButton';

const setScreenSize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};
setScreenSize();
window.addEventListener('resize', () => setScreenSize());

const HighNotePage = () => {
  const reset = Array.from({ length: 100 }, () => 0);
  const [pitchNum, setPitchNum] = useState(0);
  const [started, setGetStarted] = useState(false);
  const [maxNote, setMaxNote] = useState('');
  const [pitchList, setPitchList] = useState(reset);

  useEffect(() => {
    setPitchNum(0);
    setMaxNote('');
    setPitchList(reset);
  }, [started]);

  const getPitch = (note: number) => {
    setPitchNum(note);
    const newList = pitchList;
    newList[note] += 1;
    setPitchList(newList);
    getHighestNote();
    console.log(pitchList);
  };

  const getStarted = (data: boolean) => {
    setGetStarted(data);
  };

  const getResult = () => {
    return (
      <Footer>
        <p>현재 최고음</p>
        <p>{maxNote}</p>
      </Footer>
    );
  };

  const getHighestNote = () => {
    const noteStrings = [
      '도',
      '도#',
      '레',
      '레#',
      '미',
      '파',
      '파#',
      '솔',
      '솔#',
      '라',
      '라#',
      '시',
    ];
    for (let i = 99; i >= 0; i--) {
      if (pitchList[i] > 100) {
        let sym = noteStrings[i % 12];
        let scl = Math.floor(i / 12) - 3;
        setMaxNote(`${sym} ${scl} 옥타브`);
        break;
      }
    }
  };

  return (
    <VoiceContainer>
      {started ? (
        <Title>
          <p>자유롭게 소리를 내어보세요</p>
          <p>한 음에서 3초이상 소리내면</p>
          <p>최고음으로 인정됩니다.</p>
        </Title>
      ) : (
        <Title>
          <p className="title1">지금부터</p>
          <p className="title2">고음</p>
          <p className="title1">을 측정할게요</p>
        </Title>
      )}

      <ButtonContainer>
        <VoiceButton getStarted={getStarted} getPitch={getPitch} />
      </ButtonContainer>
      {started ? (
        getResult()
      ) : (
        <Footer>
          <a>마이크 사용이 어려우신가요?</a>
        </Footer>
      )}
    </VoiceContainer>
  );
};

const VoiceContainer = styled.div`
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
  height: 25%;
  max-width: 420px;
  font-size: 20px;
  font-family: 'omni035';
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  gap: 10px;
  p {
    position: relative;
  }
  .title1 {
    animation: fadeIn 1s ease-in;
  }
  .title2 {
    top: -10px;
    font-size: 60px;
    animation: fadeIn 1.5s ease-in forwards;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      top: 0px;
      opacity: 1;
    }
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 50%;
  max-width: 420px;
  max-height: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.div`
  width: 100%;
  height: 25%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
  a {
    font-size: 14px;
    font-family: 'omni025';
    border-bottom: 0.5px solid;
    color: #575757;
    animation: fadeIn 1s ease-in;
    cursor: pointer;
  }
  p {
    font-size: 28px;
  }
`;

const FinishButton = styled.div``;

export default HighNotePage;
