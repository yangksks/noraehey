import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { myshortsListState, userInfoState } from '../../Atom';
import { fetchData } from '../../utils/api/api';
import ShortsCard from '../Like/ShortsCard';

const UserShorts = () => {
  const [shortsList, setShortsList] = useRecoilState(myshortsListState);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState('');
  const url = useLocation().pathname.split('/')[2];

  const getMyShortsList = async () => {
    const URL = `/api/v1/shorts/member/${url}?page=${page}`;
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
    const syncFunc = async () => {
      await getMyShortsList();
      setLoading(false);
    };
    syncFunc();
  }, [url]);

  const render = () => {
    return shortsList.map((short, idx) => {
      return <ShortsCard key={idx} shorts={short}></ShortsCard>;
    });
  };

  return (
    <>
      <ShortsTitle>Hey Shorts</ShortsTitle>
      <ShortsList>{loading ? null : render()}</ShortsList>
    </>
  );
};

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

export default UserShorts;
