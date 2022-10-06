import { createFFmpeg } from '@ffmpeg/ffmpeg';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

interface ConvertType {
  start: number;
  end: number;
  m4a: any;
  getConvertAudio: Function;
  getMsg: Function;
  startUploading: Function;
}

const ConvertAudio = (props: ConvertType) => {
  const { start, end, m4a } = props;
  const [message, setMessage] = useState('');
  const ffmpeg = createFFmpeg({
    log: false,
  });

  useEffect(() => {
    props.getMsg(message);
  }, [message]);

  const doImport = async () => {
    props.startUploading();
    setMessage('파일 로딩중...');
    try {
      await ffmpeg.load();
      if (m4a) {
        ffmpeg.FS(
          'writeFile',
          'test.m4a',
          new Uint8Array(await m4a.arrayBuffer()),
        );
        setMessage('인코딩 진행중');
        const args = [
          '-ss',
          `${start}ms`,
          '-i',
          'test.m4a',
          '-t',
          `${end - start}ms`,
          '-acodec',
          'copy',
          'output.m4a',
        ];
        await ffmpeg.run(...args);
        setMessage('업로드 진행중');
        const data = ffmpeg.FS('readFile', 'output.m4a');
        const result = new File([data.buffer], 'output.m4a', {
          type: 'audio/x-m4a',
        });
        props.getConvertAudio(result);
        setMessage('업로드 완료!');
      } else {
        setMessage('업로드에 실패했습니다.');
      }
    } catch(err) {
      console.log(err)
      alert('ios 및 일부기기에서 편집이 제한됩니다. 원본을 업로드합니다.');
      props.getConvertAudio(m4a);
    }
  };
  return <ConvertButton onClick={doImport}>쇼츠등록</ConvertButton>;
};

const ConvertButton = styled.div`
  padding: 10px 22px;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #a793ff;
  color: white;
  cursor: pointer;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  &:active {
    scale: 0.95;
    opacity: 0.8;
  }
`;

export default ConvertAudio;
