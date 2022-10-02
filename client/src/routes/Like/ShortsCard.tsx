import styled from 'styled-components';

// interface ShortsCardType {
//   albumUrl: string;
// }

const ShortsCard = (props: any) => {
  const { shortsData } = props;
  // return <ShortsBox albumUrl={albumUrl}></ShortsBox>;
  return (
    <ShortsBox>
      <img src={shortsData.albumUrl} alt="" />
    </ShortsBox>
  );
};

// const ShortsBox = styled.div<{ albumUrl: string }>`
const ShortsBox = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  img {
    width: 100%;
    border-radius: 5px;
  }
`;

export default ShortsCard;
