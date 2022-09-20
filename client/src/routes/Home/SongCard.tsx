import styled from 'styled-components';

interface songProps {
  songData: any;
  userInfo: any;
}

const SongCard = (props: songProps) => {
  return (
    <SongBox>
      <AlbumArt url={props.songData.URL}></AlbumArt>
      <SongInfo>
        <h1>{props.songData.title}</h1>
        <p>{props.songData.artist}</p>
        <a>{'1key UP'}</a>
      </SongInfo>
      <KaraokeInfo>
        <h2>TJ {props.songData.tj}</h2>
        <h3>KY {props.songData.ky}</h3>
      </KaraokeInfo>
    </SongBox>
  );
};

const SongBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  padding: 5px 0;
  border-top: solid 1px #a0a0a0;
`;

const AlbumArt = styled.div<{ url: string }>`
  aspect-ratio: 1;
  width: 25%;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
`;

const SongInfo = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 5px;

  h1 {
    font-size: 14px;
    font-family: 'omni035';
  }

  p {
    font-size: 10px;
    font-family: 'omni035';
    color: #9278ff;
  }

  a {
    font-size: 10px;
    font-family: 'omni045';
    color: #c40f0f;
  }
`;

const KaraokeInfo = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  gap: 5px;

  h2 {
    display: inline;
    font-size: 9px;
    font-family: 'omni045';
    color: white;
    background-color: #9278ff;
    padding: 4px 10px;
    border-radius: 10px;
  }

  h3 {
    font-size: 9px;
    font-family: 'omni045';
    color: white;
    background-color: #c792ef;
    padding: 3px 10px;
    border-radius: 10px;
  }
`;

export default SongCard;
