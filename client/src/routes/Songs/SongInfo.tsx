import styled from 'styled-components';

const SongInfo = () => {
  return (
    <SongData>
      <Song>눈의꽃</Song>
      <Key>2옥 시</Key>
      <Level>할만해요</Level>
    </SongData>
  );
};

const SongData = styled.div`
  display: flex;
`;
const Song = styled.div``;
const Key = styled.div``;
const Level = styled.div``;
export default SongInfo;
