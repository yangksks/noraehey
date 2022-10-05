import React from 'react'

const MagazineDetailPage = () => {
  return (
    <div>MagazineDetailPage</div>
  )
}

  useEffect(() => {
    setLoading(false);
  }, []);

  const render = () => {
    return (
      <MagazineBox>
        <SubTitle title={magazineData.magazineTitle}></SubTitle>
        <ImageBox album={magazineData.magazineImageUrl} />
        <InfoCard>
          <p className="title">{magazineData.magazineSubTitle}</p>
          <p className="content">{magazineData.magazineContent}</p>
        </InfoCard>
        <SongsCard>
          <p className="songTitle">아티스트 추천곡</p>
          {songList.map((song: any, idx: number) => {
            return <SongCard key={idx} songData={song} userInfo={userKey} />;
          })}
        </SongsCard>
      </MagazineBox>
    );
  };

  return loading ? null : render();
};

const MagazineBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const ImageBox = styled.div<{ album: string }>`
  width: 100%;
  aspect-ratio: 1.333333;
  background-image: url(${({ album }) => album});
  background-size: cover;
  background-position: center center;
`;

const InfoCard = styled.div`
  width: 100%;
  padding: 20px;

  .title {
    font-size: 24px;
    padding: 10px 0 20px;
    line-height: 28px;
  }
  .content {
    font-size: 12px;
    line-height: 18px;
  }
`;

const SongsCard = styled.div`
  width: 100%;
  padding: 20px;
  .songTitle {
    font-size: 24px;
    padding: 10px 0 20px;
  }
`;
export default MagazineDetailPage;
