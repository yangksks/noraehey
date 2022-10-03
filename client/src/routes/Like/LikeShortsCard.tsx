import { useNavigate } from 'react-router';
import styled from 'styled-components';

const ShortsCard = (props: any) => {
  const { shortsData } = props;
  const navigate = useNavigate();
  return (
    <ShortsBox
      albumUrl={shortsData.songImageUrl}
      onClick={() => {
        navigate(`/shorts/${shortsData.shortsId}`);
      }}
    />
  );
};

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
