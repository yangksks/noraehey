import styled from 'styled-components';
import Mirt from 'react-mirt';
import 'react-mirt/dist/css/react-mirt.css';
import { useRef, useState } from 'react';
import ConvertAudio from './ConvertAudio';

const ShortsCreatePage = () => {

  const [file, setFile] = useState(null);
  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(1);

  const getAudio = (input: any) => {
    const audioUrl = URL.createObjectURL(input[0]);
    console.log(input[0], audioUrl);
    setFile(input[0]);
  };

  const getTrimLocation = (e: any) => {
    if (startPoint !== e.start) {
      setStartPoint(e.start);
    }
    if (endPoint !== e.end) {
      setEndPoint(e.end);
    }
  };

  return (
    <CreateContainer>
      <CreateBox>
        <input
          onChange={(e) => {
            getAudio(e.target.files);
          }}
          type="file"
          accept=".m4a"
        />
        <MirtStyle
          file={file}
          onChange={(e: any) => getTrimLocation(e)}
          options={{ fineTuningDelay: 0 }}
        />
        <ConvertAudio
          start={startPoint}
          end={Math.floor(endPoint)}
          m4a={file}
        />
      </CreateBox>
    </CreateContainer>
  );
};

const CreateContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CreateBox = styled.div`
  width: 100%;
  height: 400px;
  max-width: 420px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MirtStyle = styled(Mirt)`
  width: 90%;
  touch-action: none;
  --mirt-height: 30%;
  --mirt-playhead-width: 3px;
  --mirt-frame-color: #a793ff;
  --mirt-background-color: #a793ff;
  --mirt-button-icon-color: #ffffff;
  --mirt-handle-transition-duration: 0ms;
  --mirt-handle-width: 40px;
  .mirt__range-handle {
    height: 100%;
  }
`;

export default ShortsCreatePage;
