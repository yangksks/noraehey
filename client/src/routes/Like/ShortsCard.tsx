import { useNavigate } from 'react-router';
import styled from 'styled-components';

// interface ShortsCardType {
//   albumUrl: string;
// }

const ShortsCard = (props: any) => {
  const { shorts } = props;
  const navigate = useNavigate();
  // return <ShortsBox albumUrl={albumUrl}></ShortsBox>;
  return (
    <ShortsBox
      albumUrl={shorts.songImageUrl}
      onClick={() => {
        navigate(`/shorts/${shorts.shortsId}`);
      }}
    />
  );
};

// const ShortsBox = styled.div<{ albumUrl: string }>`
const ShortsBox = styled.div<{ albumUrl: string }>`
  height: 100%;
  border: lightgrey 1px solid;
  aspect-ratio: 1;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background-image: url(${({ albumUrl }) => albumUrl});
  background-size: 115%;
  background-position: center center;
`;

export default ShortsCard;
