import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AudioContext from './AudioContext';
import autoCorrelate from './AutoCorrelate';
import { noteFromPitch, centsOffFromPitch, getDetunePercent } from './Helpers';

const audioCtx = AudioContext.getAudioContext();
const analyserNode = AudioContext.getAnalyser();
const buflen = 2048;
let buf = new Float32Array(buflen);

const noteStrings = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

const HighNotePage = () => {
  const [source, setSource] = useState(null) as any;
  const [started, setStart] = useState(false);
  const [pitchNote, setPitchNote] = useState('C') as any;
  const [pitchScale, setPitchScale] = useState('4') as any;
  const [pitch, setPitch] = useState('0 Hz') as any;
  const [detune, setDetune] = useState('0') as any;
  const [note, setNote] = useState(0) as any;
  const [notification, setNotification] = useState(false);

  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setScreenSize();
  window.addEventListener('resize', () => setScreenSize());

  const updatePitch = (time: any) => {
    analyserNode.getFloatTimeDomainData(buf);
    var ac = autoCorrelate(buf, audioCtx.sampleRate);
    if (ac > -1) {
      let note = noteFromPitch(ac);
      if (note < 100) {
        let sym = noteStrings[note % 12];
        let scl = Math.floor(note / 12) - 1;
        let dtune = centsOffFromPitch(ac, note);
        setPitch(parseFloat(ac.toString()).toFixed(2) + ' Hz');
        setPitchNote(sym);
        setPitchScale(scl);
        setDetune(dtune);
        setNotification(false);
        setNote(note);
        //console.log(note, sym, scl, dtune, ac);
      }
    }
  };

  useEffect(() => {
    if (source != null) {
      source.connect(analyserNode);
    }
  }, [source]);

  setInterval(updatePitch, 1);

  const start = async () => {
    const input = await getMicInput();

    if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }
    setStart(true);
    setNotification(true);
    setTimeout(() => setNotification(false), 5000);
    setSource(audioCtx.createMediaStreamSource(input));
  };

  const stop = () => {
    source.disconnect(analyserNode);
    setStart(false);
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
    <VoiceContainer>
      {note}
      <Pitch>{pitchNote}</Pitch>
      {pitchScale - 2}옥타브
      {!started ? (
        <StartBtn onClick={start}>Start</StartBtn>
      ) : (
        <StartBtn onClick={stop}>Stop</StartBtn>
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
  overflow: hidden;
  gap: 30px;
`;

const Pitch = styled.div`
  font-size: 30px;
`;

const StartBtn = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 4px black;

  &:active {
    box-shadow: 0 0px 4px black;
    opacity: 0.8;
    top: 3px;
  }
`;

export default HighNotePage;
