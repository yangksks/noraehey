import React, { useState } from 'react'
import { Container } from "../style/style"

export type SongType =  {
  songId: number,
  songName: string,
}
const SongsDetailPage = () => {
  const [songData, setSongData] = useState({
    songTitle: "눈의 꽃",
    songSinger: "박효신",
    songHighPitch: "2옥시",
    songGenre: "국내드라마",
    songImageUrl: "https://cdnimg.melon.co.kr/cm/album/images/000/43/841/43841_500.jpg/melon/resize/282/quality/80/optimize",
    songTj: 12345,
    songKy: 67890,
    songLike: 100000,
    songLevel: 2,
  });
  
  return (
    <div>SongsDetailPage</div>
  )
}



export default SongsDetailPage