import styled from 'styled-components';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { BiSmile } from 'react-icons/bi';
import { keyList } from '../../utils/constants/constants';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState } from '../../Atom';
import { userType } from '../../Atom';

const SongInfo = (props: any) => {
  const { songData } = props;
  const userInfo: userType = useRecoilValue(userInfoState);

  return (
    <SongData>
      <Song>
        <p className="title">{songData.songTitle}</p>
        <p className="singer">{songData.songSinger}</p>
        <p className="album">{songData.songAlbum}</p>
      </Song>
      <Key>
        <p className="highPitch">{keyList[songData.songHighPitch]}</p>
        <p className="keyUpDown">
          {songData.songHighPitch - userInfo.songHighPitch > 0 ? (
            <>
              <span style={{ color: 'red' }}>
                {songData.songHighPitch - userInfo.songHighPitch} Key
              </span>
              <IoMdArrowDropup size={20} color={'red'} />
            </>
          ) : songData.songHighPitch - userInfo.songHighPitch < 0 ? (
            <>
              <span style={{ color: 'blue' }}>
                {Math.abs(songData.songHighPitch - userInfo.songHighPitch)} Key
              </span>
              <IoMdArrowDropdown size={20} color={'blue'} />
            </>
          ) : (
            <>
              <span style={{ color: 'green' }}>-</span>
            </>
          )}
        </p>
      </Key>
      <Level>
        <BiSmile size={40} />
        {/* <p className="songLevel">{songData.songLevel}</p> */}
        <p className="songLevel">SoSo</p>
        <p className="songLevelCount">{songData.songEvalCount}명의 평가</p>
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
    font-size: 12px;
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
