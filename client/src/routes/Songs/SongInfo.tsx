import styled from 'styled-components';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { BiSmile } from 'react-icons/bi';
const SongInfo = (props: any) => {
  const { songData } = props;
  return (
    <SongData>
      <Song>
        <p className="title">{songData.songTitle}</p>
        <p className="singer">{songData.songSinger}</p>
        <p className="album">{songData.songAlbum}</p>
      </Song>
      <Key>
        <p className="highPitch">{songData.songHighPitch}</p>
        <p className="keyUpDown">
          <span>1key</span>
          <IoMdArrowDropup size={20} />
        </p>
      </Key>
      <Level>
        <BiSmile size={40} />
        {/* <p className="songLevel">{songData.songLevel}</p> */}
        <p className="songLevel">SoSo</p>
        <p className="songLevelCount">52명의 평가</p>
      </Level>
    </SongData>
  );
};

const SongData = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;
const Song = styled.div`
  flex-grow: 1;
  p {
    padding: 2px 0;
  }
  .title {
    font-weight: 600;
  }
  .singer {
    color: ${(props) => props.theme.colors.mainPurple};
    font-size: 12px;
  }
  .album {
    font-size: 10px;
    color: ${(props) => props.theme.colors.textGray};
  }
`;

const Key = styled.div`
  padding: 0 5px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .highPitch {
  }
  .keyUpDown {
    display: flex;
    align-items: center;
  }
`;
const Level = styled.div`
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .songLevel {
    font-size: 12px;
  }
  .songLevelCount {
    font-size: 8px;
    color: ${(props) => props.theme.colors.textGray};
  }
`;
export default SongInfo;
