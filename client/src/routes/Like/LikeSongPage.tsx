import styled from 'styled-components';
import LikeSongCard from './LikeSongCard';
import { useState } from 'react';
const LikeSongPage = () => {
  const [songData, setSongData] = useState({
    songTitle: '눈의 꽃',
    songSinger: '박효신',
    songAlbum: '미안하다 사랑한다 ost',
    songHighPitch: '2옥 시',
    songGenre: '국내드라마',
    songImageUrl:
      'https://cdnimg.melon.co.kr/cm/album/images/000/43/841/43841_500.jpg/melon/resize/282/quality/80/optimize',
    songTj: 12345,
    songKy: 67890,
    isLiked: false,
    songLevel: 2,
    songLikeCount: 12311,
    songEvalCount: 52,
    songLyrics:
      '어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n어느새 길어진 그림자를 따라서\n땅거미진 어둠 속을\n그대와 걷고 있네요\n',
  });

  const userInfo = {
    key: 19,
  };

  return (
    <SongList>
      <LikeSongCard songData={songData} />
      <LikeSongCard songData={songData} />
      <LikeSongCard songData={songData} />
      <LikeSongCard songData={songData} />
      <LikeSongCard songData={songData} />
      <LikeSongCard songData={songData} />
      <LikeSongCard songData={songData} />
      <LikeSongCard songData={songData} />
      <LikeSongCard songData={songData} />
      <LikeSongCard songData={songData} />
      <LikeSongCard songData={songData} />
      <LikeSongCard songData={songData} />
    </SongList>
  );
};
const SongList = styled.div`
  width: 100%;
`;

export default LikeSongPage;
