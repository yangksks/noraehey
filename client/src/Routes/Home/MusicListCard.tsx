import styled from 'styled-components';

const MusicBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
  transition: 0.6s;
`;

const MusicListCard = () => {
  return <MusicBox>MusicListCard</MusicBox>;
};

export default MusicListCard;
