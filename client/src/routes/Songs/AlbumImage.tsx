import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

export type albumType = {
  url: string;
  songTj: number;
  songKy: number;
  isLiked: boolean;
};

const AlbumImage = (props: albumType) => {
  const { url, songTj, songKy, isLiked } = props;
  return (
    <AlbumBox url={url}>
      <NumAndLike>
        <div>
          <p className="TJ">TJ {songTj}</p>
          <p className="KY">KY {songKy}</p>
        </div>
        {isLiked ? (
          <AiFillHeart size={40} color={'#F44336'} />
        ) : (
          <AiOutlineHeart size={40} color={'#F44336'} />
        )}
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

  .TJ {
    background-color: ${(props) => props.theme.colors.mainPurple};
    margin-bottom: 5px;
  }
  .KY {
    background-color: ${(props) => props.theme.colors.mainPink};
  }
  svg {
  }
`;

export default AlbumImage;
