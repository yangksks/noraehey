import { useRecoilValue } from 'recoil';
import { shortsListState, userInfoState } from '../../Atom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface shortsType {
  idx: number;
}

const ShortsListCard = (props: shortsType) => {
  const user = useRecoilValue(userInfoState);
  const shorts = useRecoilValue(shortsListState)[props.idx];
  const userName = user.nickName.split('#')[0];
  const songData = {
    URL: shorts.songImageUrl,
    title: shorts.songTitle,
    artist: shorts.songSinger,
  };
  const navigate = useNavigate();

  const getCreatedTime = () => {
    const timeDiff = shorts.shortsCreateTime;
    const convertTime = new Date(timeDiff);
    const CurrntTime = new Date();
    const diffDate = CurrntTime.getTime() - convertTime.getTime();
    const result = Math.abs(diffDate / (1000 * 60 * 60 * 24));
    if (result > 1) {
      return Math.floor(result) + '일 전';
    } else if (result * 24 >= 1) {
      return Math.floor(result * 24) + '시간 전';
    } else if (result * 24 * 60 >= 1) {
      return Math.floor(result * 24 * 60) + '분 전';
    } else {
      return Math.floor(result * 24 * 60 * 60) + '초 전';
    }
  };

  return (
    <ShortsBox
      album={songData.URL}
      onClick={() => {
        navigate(`/shorts/${shorts.shortsId}`);
      }}>
      <HeadAndFoot />
      <Description>
        <p>{shorts.shortsComment}</p>
      </Description>
      <HeadAndFoot>
        <p className="title">{songData.title}</p>
        <p className="title">{songData.artist}</p>
        <User>
          <p>{userName}</p>
          <p>{getCreatedTime()}</p>
        </User>
      </HeadAndFoot>
    </ShortsBox>
  );
};

const User = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  p {
    color: #b4b4b4;
  }
`;

const HeadAndFoot = styled.div`
  position: relative;
  width: 100%;
  height: 25%;
  padding: 0 10px;
  gap: 3px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  font-size: 11px;
  color: #ffffff;
  font-family: 'omni025';
  box-sizing: border-box;
  .title,
  .singer {
    width: 100%;
    text-align: start;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const Description = styled.div`
  position: relative;
  width: 100%;
  height: 50%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #ffffff;
  font-family: 'omni025';
  box-sizing: border-box;
`;

const ShortsBox = styled.div<{ album: string }>`
  width: 100%;
  aspect-ratio: 0.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  background-image: linear-gradient(
      rgba(122, 122, 122, 0.55) 35%,
      rgba(0, 0, 0, 0.7) 90%
    ),
    url(${({ album }) => album});
  background-size: cover;
  background-position: center center;
`;
export default ShortsListCard;
