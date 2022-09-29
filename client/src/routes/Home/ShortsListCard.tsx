import styled from 'styled-components';

const ShortsListCard = () => {
  const songData = {
    URL: 'http://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/586/132/82586132_1647227017471_1_600x600.JPG',
    title: 'Tomboy',
    artist: '여자아이들',
  };

  const userInfo = {
    name: '원재호짱짱맨',
    profile: '',
    createdTime: '13분전',
  };

  return (
    <ShortsBox album={songData.URL}>
      <HeadAndFoot />
      <Description>
        톰보이가 되겠어
        <br />
        예암 빠킹 퇌보이~
      </Description>
      <HeadAndFoot>
        {songData.title} - {songData.artist}
        <User>
          <div>{userInfo.name}</div>
          <p>{userInfo.createdTime}</p>
        </User>
      </HeadAndFoot>
    </ShortsBox>
  );
};

const User = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  p {
    color: #b4b4b4;
  }
`;

const HeadAndFoot = styled.div`
  position: relative;
  width: 100%;
  height: 25%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  font-size: 11px;
  color: #ffffff;
  font-family: 'omni025';
  box-sizing: border-box;
`;

const Description = styled.div`
  position: relative;
  width: 100%;
  height: 50%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #ffffff;
  font-family: 'omni025';
  box-sizing: border-box;
`;

const ShortsBox = styled.div<{ album: string }>`
  width: 100%;
  aspect-ratio: 0.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  background-image: linear-gradient(
      rgba(122, 122, 122, 0.55) 35%,
      rgba(0, 0, 0, 0.7) 90%
    ),
    url(${({ album }) => album});
  background-size: cover;
  background-position: center center;
`;
export default ShortsListCard;
