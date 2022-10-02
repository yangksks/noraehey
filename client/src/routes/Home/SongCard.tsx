import styled from 'styled-components';

interface songProps {
  songData: any;
  userInfo: any;
}

const SongCard = (props: songProps) => {
  return (
    <SongBox
      onClick={() => {
        alert('곡정보 상세보기');
      }}>
      <AlbumArt url={props.songData.URL}></AlbumArt>
      <SongInfo>
        <p className="title">{props.songData.title}</p>
        <p className="artist">{props.songData.artist}</p>
        <p className="key">{'1key UP'}</p>
      </SongInfo>
      <KaraokeInfo>
        <p className="tj">TJ {props.songData.tj}</p>
        <p className="ky">KY {props.songData.ky}</p>
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

  .title {
    font-size: 14px;
    font-family: 'omni035';
  }

  .artist {
    font-size: 10px;
    font-family: 'omni035';
    color: #9278ff;
  }

  .key {
    font-size: 10px;
    font-family: 'omni045';
    color: #c40f0f;
  }
`;

const KaraokeInfo = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  gap: 10px;

  .tj {
    width: 100%;
    display: inline;
    font-size: 9px;
    font-family: 'omni035';
    color: white;
    background-color: #9278ff;
    padding: 4px;
    border-radius: 10px;
  }

  .ky {
    width: 100%;
    font-size: 9px;
    font-family: 'omni035';
    color: white;
    background-color: #c792ef;
    padding: 4px;
    border-radius: 10px;
  }
`;

export default SongCard;
