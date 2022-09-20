import styled from 'styled-components';
import { FaPlayCircle } from 'react-icons/fa';

const MagazineCardSmall = (props: any) => {
  const songData = {
    URL: '',
    title: 'Top20',
  };

  return (
    <MagazineSmall type={props.type}>
      <SmallCard>
        <Title>
          {songData.title}
          <PlayButton />
        </Title>
      </SmallCard>
    </MagazineSmall>
  );
};

const PlayButton = styled(FaPlayCircle)`
  position: relative;
  width: 50%;
  height: 50%;
  color: black;
`;

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
`;

const MagazineSmall = styled.div<{ type: number }>`
  aspect-ratio: 1;
  width: 100%;
  padding: ${({ type }) =>
    ({
      1: '10px 20px 5px 0px',
      2: '5px 20px 5px 0px',
      3: '5px 0px 5px 20px',
      4: '5px 0px 10px 20px',
    }[type])};
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

  &:hover {
    transform: scale(1.04);
    transition: 0.3s;
    cursor: pointer;
  }
`;

export default MagazineCardSmall;
