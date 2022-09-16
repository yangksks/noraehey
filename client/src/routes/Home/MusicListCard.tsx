import styled from 'styled-components';

const MusicListCard = () => {
  return <MusicBox>음악 추천 리스트</MusicBox>;
};

const MusicBox = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
  transition: 0.6s;
`;

export default MusicListCard;
