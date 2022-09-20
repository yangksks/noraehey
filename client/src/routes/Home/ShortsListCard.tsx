import styled from 'styled-components';

const ShortsListCard = () => {
  return <ShortsBox>쇼츠카드</ShortsBox>;
};

const ShortsBox = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  margin: 10px 0;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
`;
export default ShortsListCard;
