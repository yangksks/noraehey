import { useState } from 'react';
import styled from 'styled-components';

interface songLyricsType {
  lyrics: string;
}

const SongLyrics = (props: songLyricsType) => {
  const { lyrics } = props;
  const [lyricsToggle, setLyricsToggle] = useState(false);
  return (
    <>
      <LyricsBtn
        onClick={() => {
          setLyricsToggle(!lyricsToggle);
        }}>
        {lyricsToggle ? '가사접기' : '가사보기'}
      </LyricsBtn>
      {lyricsToggle ? <LyricsText>{lyrics}</LyricsText> : null}
    </>
  );
};

const LyricsBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 10px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.textGray};
`;

const LyricsText = styled.p``;
export default SongLyrics;
