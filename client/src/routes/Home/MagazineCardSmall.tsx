import styled from 'styled-components';
import { FaPlayCircle } from 'react-icons/fa';

const MagazineCardSmall = () => {
  const songData = {
    URL: '',
    title: 'Top20',
  };

  return (
    <MagazineSmall>
      <SmallCard>
        <Title>
          {songData.title}
          <FaPlayCircle />
        </Title>
      </SmallCard>
    </MagazineSmall>
  );
};

const Title = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  font-size: 17px;
  color: black;
  font-family: 'omni035';
  border-radius: 20px;
  background-color: #fff;
  box-sizing: border-box;

  svg {
    font-size: 30px;
  }
`;

const MagazineSmall = styled.div`
  aspect-ratio: 1;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const SmallCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
  border: 2px solid #960ede;
`;

export default MagazineCardSmall;
