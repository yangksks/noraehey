import styled from 'styled-components';

const ShortsListCard = () => {
  const songData = {
    URL: 'http://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/586/132/82586132_1647227017471_1_600x600.JPG',
    title: 'Tomboy',
    artist: '여자아이들'
  };

  const userInfo = {
    name: '원재호짱짱맨',
    profile: '',
    createdTime: '13분전'
  };

  return (
    <ShortsBox album={songData.URL}>
      <Description>
        톰보이가 되겠어
        <br />
        예암 빠킹 퇌보이~
      </Description>
    </ShortsBox>
  );
};

const Description = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #ffffff;
  font-family: 'omni025';
  box-sizing: border-box;
`;

const ShortsBox = styled.div<{ album: string }>`
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
  opacity: 0.75;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.4) 100%
    ),
    url(${({ album }) => album});
  background-size: cover;
  background-position: center center;
`;
export default ShortsListCard;
