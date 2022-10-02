import styled from 'styled-components';

interface ShortsCardType {
  albumUrl: string;
}

const ShortsCard = (props: ShortsCardType) => {
  const { albumUrl } = props;
  // return <ShortsBox albumUrl={albumUrl}></ShortsBox>;
  return <ShortsBox albumUrl={albumUrl} />;
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
