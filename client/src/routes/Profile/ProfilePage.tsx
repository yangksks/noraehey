import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { myshortsListState, userInfoState } from '../../Atom';
import Container from '../../style/style';
import { fetchData } from '../../utils/api/api';
import SubTitle from '../Common/SubTitle';
import ShortsCard from '../Like/ShortsCard';
const ProfilePage = () => {
  const user = useRecoilValue(userInfoState);
  const [shortsList, setShortsList] = useRecoilState(myshortsListState);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState('');

  const getMyShortsList = async (page: number) => {
    const URL = `/api/v1/shorts/member/${user.memberId}?page=${page}`;
    try {
      const result = await fetchData.get(URL);
      console.log(result);
      setShortsList(result.data.shortsList);
      setHasMore(result.data.hasMore);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMyShortsList(0);
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);

  const render = () => {
    return shortsList.map((short, idx) => {
      return <ShortsCard key={idx} albumUrl={short.songImageUrl}></ShortsCard>;
    });
  };

  return (
    <Container>
      <SubTitle title=""></SubTitle>
      <Profile>
        <img src={user.profileUrl} alt="" />
        <p>{user.nickName}</p>
      </Profile>
      <ShortsTitle>Hey Shorts</ShortsTitle>
      <ShortsList>{loading ? null : render()}</ShortsList>
    </Container>
  );
};

const Profile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  gap: 10px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: #b6b3c0 solid 1px;
  }
`;
const ShortsTitle = styled.div`
  width: 100%;
  padding: 0 20px;

  &::after {
    display: block;
    content: '';
    width: 100%;
    height: 2px;
    margin-top: 10px;
    background-color: ${(props) => props.theme.colors.lineGray};
  }
`;
const ShortsList = styled.div`
  width: 100%;
  padding: 10px 20px 0;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, minmax(auto, 300px));
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 10px;
`;
export default ProfilePage;
