import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LikeSongCard = (props: any) => {
  const { songData } = props;
  const navigate = useNavigate();
  return (
    <SongBox
      onClick={() => {
        navigate(`/songs/${songData.songId}`);
      }}>
      <img src={songData.songImageUrl} alt="" />
      <div className="songInfo">
        <p className="songTitle">{songData.songTitle}</p>
        <p className="songSinger">{songData.songSinger}</p>
        <p className="myKey">1key up</p>
      </div>
      <div className="karaoke">
        <p className="tj">TJ {songData.songTj}</p>
        <p className="ky">KY {songData.songKy}</p>
      </div>
    </SongBox>
  );
};
const SongBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 14px;
  padding: 5px 0;
  cursor: pointer;
  img {
    width: 80px;
    border-radius: 5px;
  }
  .songInfo {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
    .songTitle {
      font-size: 16px;
    }
    .songSinger {
      color: ${(props) => props.theme.colors.mainPurple};
    }
    .myKey {
      font-size: 10px;
      /* color: red; */
    }
  }
  .karaoke {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    gap: 5px;
    & > p {
      width: 100%;
      padding: 5px 10px;
      font-size: 10px;
      text-align: center;
      border-radius: 15px;
      color: white;
    }

    .tj {
      background-color: #9278ff;
      margin-bottom: 5px;
    }
    .ky {
      background-color: #c792ef;
    }
  }
`;
export default LikeSongCard;
