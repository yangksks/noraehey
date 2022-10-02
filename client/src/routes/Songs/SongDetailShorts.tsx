import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/api/api';
import { useParams } from 'react-router';
interface shortsListType {
  likeCount: number;
  memberNickname: string;
  memberProfileUrl: string;
}
const SongDetailShorts = () => {
  const { songId } = useParams();
  const [shortsData, setShortsData] = useState<shortsListType[]>([]);

  useEffect(() => {
    fetchData.get(`/api/v1/shorts/song/${songId}?page=0`).then((res) => {
      setShortsData(res.data.shortsList);
    });
  }, []);
  return (
    <SongShorts>
      <p>이곡의 HEY쇼츠 Top10</p>
      <SongShortsList>
        <ul>
          {shortsData.map((item, i) => (
            <SongShortsItem key={i}>
              <img src={item.memberProfileUrl} alt="" />
              <p className="nickname">{item.memberNickname}</p>
              <p className="like">
                <AiFillHeart size={12} color={'#f47b73'} /> {item.likeCount}
              </p>
            </SongShortsItem>
          ))}
        </ul>
      </SongShortsList>
    </SongShorts>
  );
};
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
