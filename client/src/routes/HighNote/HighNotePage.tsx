import { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchData } from '../../utils/api/api';
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
  const navigate = useNavigate();

  useEffect(() => {
    const stop = () => {
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((mediaStream) => {
          const stream = mediaStream;
          const tracks = stream.getAudioTracks();
          tracks.forEach((track) => {
            track.stop();
            track.enabled = false;
          });
          stream.removeTrack(tracks[0]);
        });
    };

    return () => {
      stop();
    };
  }, []);

  const getPitch = (note: number) => {
    const newList = pitchList;
    newList[note] += 1;
    setPitchList(newList);
    getHighestNote();
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

  const updateUserPitch = async (pitch: number) => {
    const URL = `/api/v1/member/highpitch?highpitch=${pitch}`;
    try {
      const result = await fetchData.patch(URL);
      return result.data;
    } catch (err: any) {
      console.log(err);
    }
  };

  const finish = async () => {
    await updateUserPitch(pitchNum);
    window.location.href = '/voice/result';
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
    for (let i = 99; i >= 48; i--) {
      if (pitchList[i] > 100) {
        let sym = noteStrings[i % 12];
        let scl = Math.floor(i / 12) - 3;
        setMaxNote(`${sym} ${scl} 옥타브`);
        setPitchNum(i - 47);
        break;
      }
    }
  };

  return (
    <VoiceContainer>
      {started ? (
        <>
          <BtnBox>
            <button
              onClick={() => {
                finish();
              }}>
              다음 <BsArrowRight size={20} />
            </button>
          </BtnBox>
          <Title>
            <p>자유롭게 소리를 내어보세요</p>
            <p>한 음에서 3초이상 소리내면</p>
            <p>최고음으로 인정됩니다.</p>
          </Title>
        </>
      ) : (
        <>
          <TempBox></TempBox>
          <Title>
            <p className="title1">지금부터</p>
            <p className="title2">고음</p>
            <p className="title1">을 측정할게요</p>
          </Title>
        </>
      )}

      <ButtonContainer>
        <VoiceButton
          getStarted={getStarted}
          getPitch={getPitch}
          finish={finish}
        />
      </ButtonContainer>
      {started ? (
        getResult()
      ) : (
        <Footer>
          <a>마이크 버튼을 클릭해주세요.</a>
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
const TempBox = styled.div`
  width: 100%;
  height: 10%;
  padding: 5px;
`;
const BtnBox = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  padding: 5px;
  justify-content: flex-end;
  align-items: end;
  button {
    border: none;
    width: 100px;
    height: 40px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background-color: transparent;
    cursor: pointer;
  }
`;
const Title = styled.div`
  position: relative;
  width: 100%;
  height: 15%;
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
    margin-top: 20px;
    font-size: 14px;
    font-family: 'omni025';
    color: #575757;
    animation: fadeIn 1s ease-in;
  }
  p {
    font-size: 28px;
  }
`;

export default HighNotePage;
