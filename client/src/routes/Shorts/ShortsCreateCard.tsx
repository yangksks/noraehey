import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import { fetchData } from '../../utils/api/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../Atom';
import Mirt from 'react-mirt';

interface ShortsCreateType {
  file: File;
  getTrimLocation: Function;
  getShortsComment: Function;
}

const ShortsCreateCard = (props: ShortsCreateType) => {
  const url = useLocation().pathname.split('/')[3];
  const [song, setSong] = useState({} as any);
  const user = useRecoilValue(userInfoState);
  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(1);

  const getSongsInfo = async () => {
    const URL = `/api/v1/song/info/${url}`;
    try {
      const result = await fetchData.get(URL);
      setSong(result.data);
      return result.data;
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSongsInfo();
  }, []);

  const getStartEnd = (e: any) => {
    if (startPoint !== e.start) {
      const startTime = Math.round(+e.start / 100) / 10;
      setStartPoint(startTime);
    }
    if (endPoint !== e.end) {
      const endTime = Math.round(+e.end / 100) / 10;
      setEndPoint(endTime);
    }
    props.getTrimLocation(e);
  };

  return (
    <ShortsCard>
      {/* <Profile>
        <img src={user.memberProfileUrl} alt="" />
        <div>
          <p>{user.memberNickname}</p>
        </div>
      </Profile> */}
      <Album>
        <div>
          <img src={song.songImageUrl} alt="" />
        </div>
      </Album>
      <SongInfo>
        <p>{song.songTitle}</p>
        <p>{song.songSinger}</p>
      </SongInfo>
      <MirtStyle
        file={props.file}
        onChange={(e: any) => getStartEnd(e)}
        options={{ fineTuningDelay: 0 }}
      />
      <SongsLength>
        <p>시작: {startPoint}초</p>
        <p>종료: {endPoint}초</p>
      </SongsLength>
      <textarea
        id="shortsComment"
        name="shortsComment"
        onChange={(e) => {
          props.getShortsComment(e.target.value);
        }}
      />
    </ShortsCard>
  );
};

const ShortsCard = styled.div`
  width: 100%;
  min-height: 500px;
  height: 82%;
  max-height: 750px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  border-radius: 20px;
  background: linear-gradient(
    153.96deg,
    #ebe7ff 5.39%,
    #ffffff 53.42%,
    #e9e4ff 98.54%
  );
  #shortsComment {
    width: 100%;
    aspect-ratio: 3;
    margin-top: 20px;
    padding: 10px;
    font-size: 18px;
    border-radius: 10px;
    border: lightgrey 1px solid;
    resize: none;
  }
`;

const MirtStyle = styled(Mirt)`
  width: 100%;
  touch-action: none;
  background-image: linear-gradient(
    107.48deg,
    #c6f2c6 2.51%,
    #c2e2e0 49.99%,
    #e8e8ca 94.21%
  );
  --mirt-height: 60px;
  --mirt-playhead-width: 3px;
  --mirt-frame-color: #d1c5e4;
  --mirt-playhead-color: #e8bb61;
  --mirt-button-border-color: white;
  --mirt-background-color: #d1c5e4;
  --mirt-button-icon-color: white;
  --mirt-handle-icon-color: white;
  --mirt-button-hover-color: #a793ff;
  --mirt-handle-transition-duration: 0ms;
  --mirt-handle-width: 30px;
  .mirt__range-handle {
    height: 100%;
  }
  .mirt__play-button {
    border: solid 1px lightrey;
  }
`;

const SongsLength = styled.div`
  width: 100%;
  padding: 5px 0;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: black;
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0 20px;
  gap: 5px;
  word-break: break-all;
  text-align: center;
  p:first-child {
    font-size: 18px;
  }
  p:last-child {
    font-size: 14px;
    color: ${(props) => props.theme.colors.textGray};
  }
`;

const Album = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  div {
    position: relative;
    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      margin: 14px;
    }
  }
`;

const LikeHeart = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 10px;
  & > p {
    font-size: 12px;
    flex-grow: 1;
    align-self: flex-end;
    color: gray;
    text-decoration: underline;
    cursor: pointer;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    p {
      font-size: 10px;
    }
  }
`;
export default ShortsCreateCard;
