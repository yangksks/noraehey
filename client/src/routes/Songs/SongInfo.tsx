import styled from 'styled-components';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import { HiMinusSm } from 'react-icons/hi';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { keyList } from '../../utils/constants/constants';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../Atom';
import {
  MdOutlineSentimentVerySatisfied,
  MdOutlineSentimentSatisfied,
  MdOutlineSentimentDissatisfied,
  MdOutlineSentimentVeryDissatisfied,
} from 'react-icons/md';
const SongInfo = (props: any) => {
  const { songData } = props;
  const userInfo = useRecoilValue(userInfoState);

  const evalInfoFnc = () => {
    if (songData.songLevel == 1) {
      return (
        <>
          <MdOutlineSentimentVerySatisfied size={40} color={'green'} />
          <p className="songLevel">Easy</p>
        </>
      );
    } else if (songData.songLevel == 2) {
      return (
        <>
          <MdOutlineSentimentSatisfied size={40} color={'yellowgreen'} />
          <p className="songLevel">Good</p>
        </>
      );
    } else if (songData.songLevel == 3) {
      return (
        <>
          <MdOutlineSentimentDissatisfied size={40} color={'orange'} />
          <p className="songLevel">Hard</p>
        </>
      );
    } else if (songData.songLevel == 4) {
      return (
        <>
          <MdOutlineSentimentVeryDissatisfied size={40} color={'#e23a3a'} />
          <p className="songLevel">Hell</p>
        </>
      );
    } else {
      return (
        <>
          <AiOutlineQuestionCircle size={40} color={'gray'} />
          <p className="songLevel">평가없음</p>
        </>
      );
    }
  };

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
          {songData.songHighPitch != 0 &&
          songData.songHighPitch - userInfo.memberHighPitch > 0 ? (
            <>
              <span style={{ color: '#d53958' }}>
                {songData.songHighPitch - userInfo.memberHighPitch} Key
              </span>
              <MdOutlineKeyboardArrowUp size={20} color={'#d53958'} />
            </>
          ) : songData.songHighPitch != 0 &&
            songData.songHighPitch - userInfo.memberHighPitch < 0 ? (
            <>
              <span style={{ color: '#5574c4' }}>
                {Math.abs(songData.songHighPitch - userInfo.memberHighPitch)}{' '}
                Key
              </span>
              <MdOutlineKeyboardArrowDown size={20} color={'#5574c4'} />
            </>
          ) : (
            <>
              <span style={{ color: '#5ca535' }}>0 Key</span>
              <HiMinusSm size={20} color={'#5ca535'} />
            </>
          )}
        </p>
      </Key>
      <Level level={songData.songLevel}>
        {evalInfoFnc()}
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
  flex-shrink: 0;
  .highPitch {
  }
  .keyUpDown {
    display: flex;
    align-items: center;
    font-size: 12px;
  }
`;
const Level = styled.div<{ level: number }>`
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  gap: 2px;
  .songLevel {
    font-size: 12px;
    color: ${(props) =>
      props.level == 1
        ? 'green'
        : props.level == 2
        ? 'yellowgreen'
        : props.level == 3
        ? 'orange'
        : props.level == 4
        ? '#e23a3a'
        : 'gray'};
  }
  .songLevelCount {
    font-size: 10px;
    font-family: 'omni025';
    color: ${(props) => props.theme.colors.textGray};
  }
`;
export default SongInfo;
