import styled from 'styled-components';

const MagazineCardBig = (props: any) => {
  const songData = {
    URL: 'https://file.mk.co.kr/meet/neds/2022/05/image_readtop_2022_406833_16520588985036000.jpg',
    title: '르세라핌 컴백!',
  };

  return (
    <BigCardContainer type={props.type}>
      <BigCard album={songData.URL}>
        <Title>{songData.title}</Title>
      </BigCard>
    </BigCardContainer>
  );
};

const Title = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  color: white;
  font-family: 'omni035';
`;

const BigCardContainer = styled.div<{ type: number }>`
  aspect-ratio: 1;
  width: 66.6666%;
  padding: ${({ type }) =>
    ({
      1: '10px 10px 5px 20px',
      2: '5px 20px 10px 10px',
    }[type])};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BigCard = styled.div<{ album: string }>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 0.5px solid #a3a3a3;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
  background-image: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(0, 0, 0, 0.7),
      rgba(255, 255, 255, 0)
    ),
    url(${({ album }) => album});
  background-size: cover;
  background-position: center center;

  &:hover {
    transform: scale(1.025);
    transition: 0.4s;
    cursor: pointer;
  }
`;

export default MagazineCardBig;
