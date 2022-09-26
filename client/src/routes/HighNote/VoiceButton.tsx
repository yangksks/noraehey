import styled from 'styled-components';
import { useEffect, useState } from 'react';
import AudioContext from './AudioContext';
import autoCorrelate from './AutoCorrelate';
import VoiceButtonBorder from './VoiceButtonBorder';
import { FiMic } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const audioCtx = AudioContext.getAudioContext();
const analyserNode = AudioContext.getAnalyser();
const buflen = 2048;
let buf = new Float32Array(buflen);

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

interface VoiceBtnType {
  getStarted: Function;
  getPitch: Function;
}

const VoiceButton = (props: VoiceBtnType) => {
  const [source, setSource] = useState(null) as any;
  const [started, setStart] = useState(false);
  const [pitchNote, setPitchNote] = useState('도') as any;
  const [pitchScale, setPitchScale] = useState('1') as any;

  const noteFromPitch = (frequency: any) => {
    var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return Math.round(noteNum) + 69;
  };

  const getResult = (data: number) => {
    props.getPitch(data);
  };

  const updatePitch = () => {
    analyserNode.getFloatTimeDomainData(buf);
    var ac = autoCorrelate(buf, audioCtx.sampleRate);
    if (ac > -1) {
      let note = noteFromPitch(ac);
      if (note < 100) {
        let sym = noteStrings[note % 12];
        let scl = Math.floor(note / 12) - 1;
        setPitchNote(sym);
        setPitchScale(scl - 2);
        getResult(note);
      }
    }
  };

  useEffect(() => {
    if (source != null) {
      source.connect(analyserNode);
    }
  }, [source]);

  setInterval(updatePitch, 100);

  const start = async () => {
    const input = await getMicInput();

    if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }
    setStart(true);
    setSource(audioCtx.createMediaStreamSource(input));
    props.getStarted(true);
  };

  const stop = () => {
    source.disconnect(analyserNode);
    setStart(false);
    props.getStarted(false);
    setPitchNote('도');
    setPitchScale(1);
  };

  const getMicInput = () => {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        autoGainControl: false,
        noiseSuppression: false,
        latency: 0,
      },
    });
  };
  return (
    <>
      <VoiceButtonBorder />
      {!started ? (
        <StartBtn onClick={start} status={started}>
          <FiMic />
        </StartBtn>
      ) : (
        <StartBtn onClick={stop} status={started}>
          {pitchNote}
          <p>{pitchScale} 옥타브</p>
        </StartBtn>
      )}
    </>
  );
};

const StartBtn = styled.div<{ status: boolean }>`
  position: relative;
  aspect-ratio: 1;
  width: 50%;
  border-radius: 50%;
  display: flex;
  background-color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
  animation: ${({ status }) => (status ? '' : 'bounce 1.5s linear infinite')};

  p {
    font-size: 12px;
  }

  svg {
    width: 50%;
    height: 50%;
    position: absolute;
    stroke-width: 2;
  }

  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.99);
    }
    35% {
      transform: scale(0.96);
    }
    45% {
      transform: scale(1.03);
    }
    55% {
      transform: scale(0.98);
    }
    65% {
      transform: scale(1.02);
    }
    75% {
      transform: scale(1.01);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default VoiceButton;
