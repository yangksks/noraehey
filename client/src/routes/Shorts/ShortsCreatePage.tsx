import styled from 'styled-components';
import Mirt from 'react-mirt';
import 'react-mirt/dist/css/react-mirt.css';
import { ImArrowLeft2 } from 'react-icons/im';
import { useState } from 'react';
import ConvertAudio from './ConvertAudio';
import { fetchData } from '../../utils/api/api';
import SongBriefInfo from './SongBriefInfo';
import { useNavigate } from 'react-router-dom';

const ShortsCreatePage = () => {
  const [file, setFile] = useState(null as any);
  const [cmt, setCmt] = useState('');
  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(1);
  const navigate = useNavigate();

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
      <Title>
        <TitleBox>
          <ImArrowLeft2
            size={30}
            onClick={() => {
              navigate(-1);
            }}
          />
          <p>쇼츠등록</p>
        </TitleBox>
        <ConvertAudio
          start={startPoint}
          end={Math.floor(endPoint)}
          m4a={file}
        />
      </Title>

      <CreateBox>
        <ShortsCard>
          <SongBriefInfo />
          <textarea
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
      </CreateBox>
    </CreateContainer>
  );
};

const SubtitleBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: tomato;
`;

const CreateContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const MirtStyle = styled(Mirt)`
  width: 100%;
  touch-action: none;
  --mirt-height: 50px;
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

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;

  p {
    padding-left: 25px;
    font-size: 18px;
    font-family: 'omni045';
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;
export default ShortsCreatePage;
