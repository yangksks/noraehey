import styled, { css } from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/api/api';
import React from 'react';
export interface shortsDetailType {
  shortsId: number;
  shortsComment: string;
  shortsAudioUrl: string;
  shortsCreateTime: string;
  songId: number;
  songTitle: string;
  songSinger: string;
  songHighPitch: number;
  songImageUrl: string;
  songTj: string;
  songKy: string;
  memberId: number;
  memberNickname: string;
  memberProfileUrl: string;
  likeCount: number;
  isLiked: boolean;
}

const ShortsDetailCard = (props: any) => {
  const { shortsData, play, setPlay } = props;
  // const [audio, setAudio] = useState(new Audio());
  // const [play, setPlay] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // setAudio(new Audio(shortsData.shortsAudioUrl));
    setLikeCount(shortsData.likeCount);
    setLiked(shortsData.liked);
  }, [props]);

  // useEffect(() => {
  //   play ? audio.play() : audio.pause();
  // }, [play]);
  return (
    <ShortsCard>
      <Profile>
        <img src={shortsData.memberProfileUrl} alt="" />
        <div>
          <p>{shortsData.memberNickname}</p>
          <span>{shortsData.shortsCreateTime}</span>
        </div>
      </Profile>
      <Album
        play={play}
        onClick={() => {
          setPlay(!play);
        }}>
        <div>
          <i></i>
          <img src={shortsData.songImageUrl} alt="" />
        </div>
      </Album>
      <SongInfo>
        <p>{shortsData.songTitle}</p>
        <p>{shortsData.songSinger}</p>
      </SongInfo>
      <Content>{shortsData.shortsComment}</Content>
      <LikeHeart>
        <div>
          {liked ? (
            <AiFillHeart
              size={30}
              color={'#f47b73'}
              onClick={() => {
                fetchData
                  .delete(`/api/v1/shorts/like`, {
                    data: {
                      shortsId: shortsData.shortsId,
                    },
                  })
                  .then((res) => {
                    setLikeCount(res.data.likeCount);
                    setLiked(res.data.liked);
                  });
              }}
            />
          ) : (
            <AiOutlineHeart
              size={30}
              color={'#f47b73'}
              onClick={() => {
                fetchData
                  .post(`/api/v1/shorts/like`, {
                    shortsId: shortsData.shortsId,
                  })
                  .then((res) => {
                    setLikeCount(res.data.likeCount);
                    setLiked(res.data.liked);
                  });
              }}
            />
          )}

          <p>{likeCount}</p>
        </div>
      </LikeHeart>
    </ShortsCard>
  );
};

const ShortsCard = styled.div`
  width: 90%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
`;

const Album = styled.div<{ play: boolean }>`
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

    i {
      content: '';
      width: 228px;
      height: 228px;
      position: absolute;
      inset: 0;
      border-radius: 50%;
      padding: 8px;
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      mask: default;
      transition: 1s;
      ${(props) =>
        props.play &&
        css`
          animation: rotate 2s linear infinite;
          @keyframes rotate {
            100% {
              transform: rotate(1turn);
            }
          }
        `}
    }

    i::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 228px;
      height: 228px;
      background: ${(props) => props.theme.colors.gradientPurpleToYellow};
      transform: translate(-50%, -50%) rotate(45deg);
    }

    @keyframes rotate {
      from {
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      to {
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
      }
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

  justify-content: flex-end;
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
export default ShortsDetailCard;
