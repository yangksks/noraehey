import { createFFmpeg } from '@ffmpeg/ffmpeg';
import styled from 'styled-components';
import { useRef, useState } from 'react';

interface ConvertType {
  start: number;
  end: number;
  m4a: any;
  getConvertAudio: Function;
}

const ConvertAudio = (props: ConvertType) => {
  const { start, end, m4a } = props;
  const [message, setMessage] = useState('Click Start to import');
  const ffmpeg = createFFmpeg({
    log: false,
  });

  const doImport = async () => {
    setMessage('Loading ffmpeg-core.js');
    await ffmpeg.load();
    if (m4a) {
      console.log(m4a);
      ffmpeg.FS(
        'writeFile',
        'test.m4a',
        new Uint8Array(await m4a.arrayBuffer()),
      );
      setMessage('Start Import');
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
      setMessage('Complete Import');
      const data = ffmpeg.FS('readFile', 'output.m4a');
      const result = new File([data.buffer], 'output.m4a', {
        type: 'audio/x-m4a',
      });
      props.getConvertAudio(result);
    } else {
      setMessage('Can not Import. need file check. 😪');
    }
  };
  return (
    <ConvertButton className="shortsBtn" onClick={doImport}>
      업로드
    </ConvertButton>
  );
};

const ConvertButton = styled.div`
  padding: 10px 20px;
  background-color: lavender;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default ConvertAudio;
