import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { IoIosHeartEmpty } from 'react-icons/io';
import { fetchData } from '../../utils/api/api';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
export type albumType = {
  url: string;
  songTj: string;
  songKy: string;
  liked: boolean;
  songLikeCount: number;
};

const AlbumImage = (props: albumType) => {
  const { songId } = useParams();
  const { url, songTj, songKy } = props;
  const [myLike, setMyLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    setMyLike(props.liked);
    setLikeCount(props.songLikeCount);
  }, [props]);

  return (
    <AlbumBox url={url}>
      <NumAndLike>
        <div>
          <p className="TJ">TJ {songTj}</p>
          <p className="KY">KY {songKy}</p>
        </div>
        <div className="like">
          {myLike ? (
            <AiFillHeart
              size={35}
              color={'#f47b73'}
              onClick={() => {
                fetchData
                  .delete('/api/v1/song/like', {
                    data: { songId: songId },
                  })
                  .then(() => {
                    fetchData.get(`/api/v1/song/info/${songId}`).then((res) => {
                      setLikeCount(res.data.songLikeCount);
                      setMyLike(res.data.liked);
                    });
                  });
              }}
            />
          ) : (
            <AiOutlineHeart
              size={35}
              color={'#f47b73'}
              onClick={() => {
                fetchData
                  .post('/api/v1/song/like', { songId: songId })
                  .then(() => {
                    fetchData.get(`/api/v1/song/info/${songId}`).then((res) => {
                      setLikeCount(res.data.songLikeCount);
                      setMyLike(res.data.liked);
                    });
                  });
              }}
            />
          )}
          <span>{likeCount}</span>
        </div>
      </NumAndLike>
    </AlbumBox>
  );
};

const AlbumBox = styled.div<{ url: string }>`
  background: url(${(props) => props.url}) no-repeat;
  background-size: 100%;
  width: 300px;
  height: 300px;
  border-radius: 10px;
  display: flex;
  align-items: flex-end;
`;
const NumAndLike = styled.div`
  background-color: rgba(190, 190, 190, 0.5);
  border-radius: 0 0 10px 10px;
  display: flex;
  width: 100%;
  padding: 5px 10px;
  justify-content: space-between;
  align-items: center;

  div > p {
    padding: 5px 10px;
    font-size: 12px;
    text-align: center;
    border-radius: 5px;
    color: white;
  }
  .like {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
    span {
      display: block;
      font-size: 10px;
    }
  }
  .TJ {
    background-color: #9278ff;
    margin-bottom: 5px;
  }
  .KY {
    background-color: #c792ef;
  }
  svg {
  }
`;

export default AlbumImage;
