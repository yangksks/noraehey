import { useState } from 'react';
import styled from 'styled-components';

interface songLyricsType {
  lyrics: string;
}

const SongLyrics = (props: songLyricsType) => {
  const { lyrics } = props;
  const printLyrics = lyrics;
  const [lyricsToggle, setLyricsToggle] = useState(false);
  return (
    <>
      <LyricsBtn
        onClick={() => {
          setLyricsToggle(!lyricsToggle);
        }}>
        {lyricsToggle ? '가사접기' : '가사보기'}
      </LyricsBtn>
      {lyrics && (
        <LyricsText
          dangerouslySetInnerHTML={{
            __html: printLyrics.replace(/\n/gi, '<br />'),
          }}
          lyricsToggle={lyricsToggle}></LyricsText>
      )}
    </>
  );
};

const LyricsBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 20px 0 10px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.textGray};
  &:active {
    scale: 0.95;
    opacity: 0.8;
  }
`;

const LyricsText = styled.div<{ lyricsToggle: boolean }>`
  width: calc(100% - 40px);
  height: ${(props) => (props.lyricsToggle ? '200px' : '0px')};
  text-align: center;
  font-size: 14px;
  transition: 0.2s ease-in-out;
  overflow: auto;
  line-height: 20px;
`;
export default SongLyrics;
