import styled from 'styled-components';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useState } from 'react';

const ShortsCreatePage = () => {
  const [file, setFile] = useState('');

  const getAudio = (input: any) => {
    const audioUrl = URL.createObjectURL(input[0]);
    console.log(input[0], audioUrl);
    setFile(audioUrl);
  };
  return (
    <CreateContainer>
      안녕하세요
      <input
        onChange={(e) => {
          getAudio(e.target.files);
        }}
        type="file"
        accept="audio"
      />
      <AudioPlayer src={file} onPlay={(e) => console.log('onPlay')} />
    </CreateContainer>
  );
};

const CreateContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: tomato;
`;

const CreateBox = styled.div`
  width: 100%;
  height: 100%;
  max-width: 420px;
  background-color: tomato;
`;

export default ShortsCreatePage;
