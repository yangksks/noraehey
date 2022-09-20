import styled from 'styled-components';
import MagazineCardBig from './MagazineCardBig';
import MagazineCardSmall from './MagazineCardSmall';

const MagazineList = () => {
  return (
    <MagazineListBox>
      <CardsContainer>
        <MagazineCardBig type={1} />
        <SmallBoxContainer>
          <MagazineCardSmall type={1} />
          <MagazineCardSmall type={2} />
        </SmallBoxContainer>
      </CardsContainer>
      <CardsContainer>
        <SmallBoxContainer>
          <MagazineCardSmall type={3} />
          <MagazineCardSmall type={4} />
        </SmallBoxContainer>
        <MagazineCardBig type={2} />
      </CardsContainer>
    </MagazineListBox>
  );
};

const MagazineListBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SmallBoxContainer = styled.div`
  aspect-ratio: 1 / 2;
  width: 33.3333%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default MagazineList;
