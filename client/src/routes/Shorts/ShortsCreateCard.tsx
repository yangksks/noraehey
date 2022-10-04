import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import { fetchData } from '../../utils/api/api';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

const ShortsCreateCard = () => {
  const navigate = useNavigate();

  const getSongsInfo = async () => {
    const URL = '/api/v1/song/info/{songId}';
    try {
      const result = await fetchData.get(URL);
      return result.data;
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <ShortsCard>
      <Profile>
        <img
          src={''}
          alt=""
          onClick={() => {
            navigate(`/profile/${''}`);
          }}
        />
        <div>
          <p>{''}</p>
          <span>{''}</span>
        </div>
        <IoClose
          size={32}
          onClick={() => {
            navigate(-1);
          }}
        />
      </Profile>
      <Album>
        <div>
          <img src={'앨범아트'} alt="" />
        </div>
      </Album>
      <SongInfo>
        <p>제목</p>
        <p>가수</p>
      </SongInfo>
      <Content>코멘트</Content>
      <LikeHeart>
        <div>
          <AiFillHeart size={30} color={'#f47b73'} />
          <p>33</p>
        </div>
      </LikeHeart>
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
`;
const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0;
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
const Profile = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }
  & > div {
    display: flex;
    flex-grow: 1;
    gap: 8px;
    align-items: center;
    & > span {
      font-size: 12px;
      color: ${(props) => props.theme.colors.textGray};
    }
  }
  svg {
    align-self: flex-start;
    cursor: pointer;
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

const Content = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 0;
  height: 150px;
  text-align: center;
`;

const LikeHeart = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
