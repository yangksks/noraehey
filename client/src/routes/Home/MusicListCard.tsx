import styled from 'styled-components';

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

const MusicListCard = () => {
  return <MusicBox>MusicListCard</MusicBox>;
};

export default MusicListCard;
