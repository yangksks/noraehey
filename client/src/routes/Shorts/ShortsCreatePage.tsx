import styled from 'styled-components';
import Mirt from 'react-mirt';
import 'react-mirt/dist/css/react-mirt.css';
import { useState } from 'react';
import ConvertAudio from './ConvertAudio';
import { fetchData } from '../../utils/api/api';
import SongBriefInfo from './SongBriefInfo';

const ShortsCreatePage = () => {
  const [file, setFile] = useState(null as any);
  const [cmt, setCmt] = useState('');
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

  const getShortsComment = (commentData: any) => {
    setCmt(commentData);
  };

  const getFormData = async (e: any) => {
    e.preventDefault();
    let formData = new FormData();
    let shortsInfo = {
      songId: 1,
      shortsComment: cmt,
    };
    const option = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    formData.append('shortsAudioFile', file);
    formData.append(
      'shortsInfo',
      new Blob([JSON.stringify(shortsInfo)], { type: 'application/json' }),
    );

    const URL = '/api/v1/shorts';
    try {
      const result = await fetchData.post(URL, formData, option);
      console.log(result);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <CreateContainer>
      <CreateBox>
        <ShortsCard>
          <SongBriefInfo />
          <input
            type="text"
            id="shortsComment"
            name="shortsComment"
            onChange={(e) => {
              getShortsComment(e.target.value);
            }}
          />
        </ShortsCard>
        <MirtStyle
          file={file}
          onChange={(e: any) => getTrimLocation(e)}
          options={{ fineTuningDelay: 0 }}
        />
        <ButtonGroup>
          <label className="shortsBtn" htmlFor="shortsAudioFile">
            음성파일
          </label>
          <input
            onChange={(e) => {
              getAudio(e.target.files);
            }}
            type="file"
            accept=".m4a"
            name="shortsAudioFile"
            id="shortsAudioFile"
            style={{ display: 'none' }}
          />
          <ConvertAudio
            start={startPoint}
            end={Math.floor(endPoint)}
            m4a={file}
          />
        </ButtonGroup>
      </CreateBox>
    </CreateContainer>
  );
};

const CreateContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CreateBox = styled.div`
  width: 100%;
  height: 100%;
  max-width: 420px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const ShortsCard = styled.div`
  width: 100%;
  height: 100%;
  gap: 20px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: orange;

  #shortsComment {
    width: 100%;
    aspect-ratio: 4;
  }
`;

const ButtonGroup = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .shortsBtn {
    padding: 10px 20px;
    background-color: lavender;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

const MirtStyle = styled(Mirt)`
  width: 100%;
  touch-action: none;
  --mirt-height: 100px;
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
