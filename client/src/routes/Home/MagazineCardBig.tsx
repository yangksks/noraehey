import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MagazineCardBig = (props: any) => {
  const navigate = useNavigate();
  const magazineData = props.magazine;

  return (
    <BigCardContainer
      onClick={() => {
        navigate(`/magazine/${magazineData.magazineId}`);
      }}>
      <BigCard album={magazineData.magazineImageUrl}>
        <Title>{magazineData.magazineTitle}</Title>
      </BigCard>
    </BigCardContainer>
  );
};

const Title = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: start;
  font-size: 22px;
  color: white;
  font-family: 'omni035';
  text-align: start;
`;

const BigCardContainer = styled.div`
  aspect-ratio: 1;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
      rgba(255, 255, 255, 0) 30%,
      rgba(0, 0, 0, 0.9) 90%
    ),
    url(${({ album }) => album});
  background-size: cover;
  background-position: center center;
`;

export default MagazineCardBig;
