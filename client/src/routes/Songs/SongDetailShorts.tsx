import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/api/api';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
interface shortsListType {
  shortsId: number;
  likeCount: number;
  memberNickname: string;
  memberProfileUrl: string;
}
const SongDetailShorts = () => {
  const { songId } = useParams();
  const [shortsData, setShortsData] = useState<shortsListType[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData.get(`/api/v1/shorts/song/${songId}?page=0`).then((res) => {
      setShortsData(res.data.shortsList);
    });
  }, []);
  return (
    <SongShorts>
      <p>이곡의 HEY쇼츠 Top10</p>
      <SongShortsList>
        {shortsData.length !== 0 ? (
          <ul>
            {shortsData.map((item, i) => (
              <SongShortsItem
                key={i}
                onClick={() => {
                  navigate(`/shorts/${item.shortsId}`);
                }}>
                <img src={item.memberProfileUrl} alt="" />
                <p className="nickname">{item.memberNickname}</p>
                <p className="like">
                  <AiFillHeart size={12} color={'#f47b73'} /> {item.likeCount}
                </p>
              </SongShortsItem>
            ))}
          </ul>
        ) : (
          <NoData>첫 번째 쇼츠의 주인공이 되어주세요!</NoData>
        )}
      </SongShortsList>
    </SongShorts>
  );
};

const NoData = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.textGray};
`;

const SongShorts = styled.div`
  width: 100%;
  padding: 0 20px;
  & > p {
    padding-bottom: 10px;
  }
`;

const SongShortsList = styled.div`
  ul {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    overflow: auto;
    padding-bottom: 15px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const SongShortsItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 70px;
  overflow: hidden;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .nickname {
    font-size: 12px;
    text-align: center;
  }
  .like {
    font-size: 10px;
    display: flex;
    align-items: center;
    gap: 2px;
  }
`;
export default SongDetailShorts;
