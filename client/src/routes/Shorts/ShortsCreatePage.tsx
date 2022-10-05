import styled from 'styled-components';
import 'react-mirt/dist/css/react-mirt.css';
import { useEffect, useState } from 'react';
import ConvertAudio from './ConvertAudio';
import { fetchData } from '../../utils/api/api';
import { useLocation, useNavigate } from 'react-router-dom';
import ShortsCreateCard from './ShortsCreateCard';
import SubTitle from '../Common/SubTitle';
import { GrClose } from 'react-icons/gr';

const ShortsCreatePage = () => {
  const [file, setFile] = useState(null as any);
  const [convertFile, setConvertFile] = useState(null as any);
  const [cmt, setCmt] = useState('');
  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [finish, setFinish] = useState(false);
  const songId = useLocation().pathname.split('/')[3];
  const navigate = useNavigate();

  useEffect(() => {
    if (convertFile) {
      getFormData();
    }
  }, [convertFile]);

  const stopUploading = () => {
    setUploading(false);
  };

  const startUploading = () => {
    setUploading(true);
  };

  const getMsg = (e: string) => {
    setMessage(e);
  };

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
      setUploading(true);
      const result = await fetchData.post(URL, formData, option);
      setFinish(true);
      setConvertFile(null);
    } catch (err: any) {
      setUploading(false);
      setMessage('업로드 실패, 다시 시도해주세요');
    }
  };

  return (
    <CreateContainer>
      <SubTitle title={'쇼츠등록'} />
      <CreateBox>
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
          getMsg={getMsg}
          startUploading={startUploading}
        />
      </Buttons>
      {uploading ? (
        <MsgModal>
          <ModalCard>
            <div
              className="modalHeader"
              onClick={() => {
                stopUploading();
              }}>
              <GrClose />
            </div>
            <div className="modalMsg">{message}</div>
            <div className="modalFooter">
              {finish ? (
                <div
                  className="shortsBtn"
                  onClick={() => {
                    navigate(`/songs/${songId}`);
                  }}>
                  완료
                </div>
              ) : null}
            </div>
          </ModalCard>
        </MsgModal>
      ) : null}
    </CreateContainer>
  );
};

const CreateContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .shortsBtn {
    padding: 5px 20px;
    border-radius: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #e8bb61;
    color: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    &:active {
      scale: 0.95;
      opacity: 0.8;
    }
  }
`;

const MsgModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(93, 93, 93, 0.565);
  z-index: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalCard = styled.div`
  width: 80%;
  height: 30%;
  padding: 20px;
  max-width: 380px;
  background-color: white;
  border-radius: 20px;
  border: 2px solid grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .modalHeader {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    svg {
      font-size: 20px;
      cursor: pointer;
      &:hover {
        scale: 1.02;
      }
    }
  }
  .modalMsg {
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .modalFooter {
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
  }
`;

const CreateBox = styled.div`
  width: 100%;
  height: 100%;
  max-width: 420px;
  padding: 10px 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Buttons = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 20px;
  gap: 40px;
`;

export default ShortsCreatePage;
