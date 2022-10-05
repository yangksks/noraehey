import styled from 'styled-components';
import 'react-mirt/dist/css/react-mirt.css';
import { ImArrowLeft2 } from 'react-icons/im';
import { useEffect, useState } from 'react';
import ConvertAudio from './ConvertAudio';
import { fetchData } from '../../utils/api/api';
import { useNavigate } from 'react-router-dom';
import ShortsCreateCard from './ShortsCreateCard';

const ShortsCreatePage = () => {
  const [file, setFile] = useState(null as any);
  const [convertFile, setConvertFile] = useState(null as any);
  const [cmt, setCmt] = useState('');
  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(convertFile);
    if (convertFile) {
      getFormData();
    }
  }, [convertFile]);

  const getAudio = (input: any) => {
    setFile(input[0]);
  };

  const getConvertAudio = (cvt: any) => {
    setConvertFile(cvt);
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

  const getFormData = async () => {
    let formData = new FormData();
    let shortsInfo = {
      songId: window.location.href.split('/')[5],
      shortsComment: cmt,
    };
    const option = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    formData.append('shortsAudioFile', convertFile);
    formData.append(
      'shortsInfo',
      new Blob([JSON.stringify(shortsInfo)], { type: 'application/json' }),
    );

    const URL = '/api/v1/shorts';
    try {
      const result = await fetchData.post(URL, formData, option);
      console.log(result);
      setConvertFile(null);
      navigate('/');
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
      </Title>

      <CreateBox>
        {/* <ShortsCard>
          <SongBriefInfo />
        </ShortsCard> */}
        <ShortsCreateCard
          file={file}
          getTrimLocation={getTrimLocation}
          getShortsComment={getShortsComment}
        />
      </CreateBox>
      <Buttons>
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
          getConvertAudio={getConvertAudio}
        />
      </Buttons>
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

  .shortsBtn {
    padding: 4px 22px;
    border-radius: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #e8bb61;
    color: white;
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

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
  padding-top: 1px;
  box-sizing: border-box;

  p {
    padding-left: 25px;
    font-size: 18px;
  }
`;

const Buttons = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 10px;
  gap: 40px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;
export default ShortsCreatePage;
