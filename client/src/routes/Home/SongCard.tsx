import styled from 'styled-components';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { HiMinusSm } from 'react-icons/hi';

interface songsType {
  songHighPitch: 0;
  songId: -1;
  songImageUrl: '';
  songKy: '';
  songSinger: '';
  songTitle: '';
  songTj: '';
}

interface songProps {
  songData: songsType;
  userInfo: number;
}

const SongCard = (props: songProps) => {
  const diff = props.songData.songHighPitch - props.userInfo;
  const navigate = useNavigate();
  const myKey =
    (diff < 0 && `${-diff} Key`) ||
    (diff === 0 && `${diff} Key`) ||
    (diff > 0 && `${diff} Key`);

  const keyColor =
    (diff < 0 && '#5574c4') ||
    (diff === 0 && '#5ca535') ||
    (diff > 0 && '#d53958');
  return (
    <SongBox
      onClick={() => {
        navigate(`/songs/${props.songData.songId}`);
      }}>
      <AlbumArt url={props.songData.songImageUrl}></AlbumArt>
      <SongInfo>
        <p className="title">{props.songData.songTitle}</p>
        <p className="artist">{props.songData.songSinger}</p>
        <p className="key" style={{ color: `${keyColor}` }}>
          {myKey}
          {(diff < 0 && <MdOutlineKeyboardArrowDown />) ||
            (diff === 0 && <HiMinusSm />) ||
            (diff > 0 && <MdOutlineKeyboardArrowUp />)}
        </p>
      </SongInfo>
      <KaraokeInfo>
        <p className="tj">TJ {props.songData.songTj}</p>
        <p className="ky">KY {props.songData.songKy}</p>
      </KaraokeInfo>
    </SongBox>
  );
};

const SongBox = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 8px 1px;
  &:active {
    scale: 0.95;
    opacity: 0.8;
  }
  cursor: pointer;
`;

const AlbumArt = styled.div<{ url: string }>`
  aspect-ratio: 1;
  width: 25%;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
`;

const SongInfo = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 5px;

  .title {
    width: 100%;
    font-size: 12px;
    font-family: 'omni035';
    text-align: start;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .artist {
    font-size: 10px;
    font-family: 'omni035';
    color: #9278ff;
    text-align: start;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .key {
    height: 14px;
    padding: 0;
    margin: 0;
    font-size: 10px;
    font-family: 'omni045';
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    svg {
      position: relative;
      font-size: 22px;
      margin-bottom: 1px;
    }
  }
`;

const KaraokeInfo = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  gap: 10px;

  .tj {
    width: 70px;
    display: inline;
    font-size: 10px;
    font-family: 'omni035';
    color: white;
    background-color: #9278ff;
    padding: 4px;
    border-radius: 10px;
    text-align: center;
  }

  .ky {
    width: 70px;
    font-size: 10px;
    font-family: 'omni035';
    color: white;
    background-color: #c792ef;
    padding: 4px;
    border-radius: 10px;
    text-align: center;
  }
`;

export default SongCard;
