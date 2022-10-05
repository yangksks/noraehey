import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  reccommendSongsState,
  shortsHotListLengthState,
  shortsHotListState,
  shortsListLengthState,
  shortsListState,
  tagListState,
  userInfoState,
} from '../../Atom';
import { fetchData, removeAccessToken } from '../../utils/api/api';
import VoiceButtonBorder from '../HighNote/VoiceButtonBorder';
import _ from 'lodash';
import Header from './Header';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

const LoadingSpinner = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [shortsList, setShortsList] = useRecoilState(shortsListState);
  const [shortsLength, setShortsLength] = useRecoilState(shortsListLengthState);
  const [shortsHotList, setShortsHotList] = useRecoilState(shortsHotListState);
  const [shortsHotLength, setShortsHotLength] = useRecoilState(
    shortsHotListLengthState,
  );
  const [reccommendSongs, setReccommendSongs] =
    useRecoilState(reccommendSongsState);
  const [tagList, setTagList] = useRecoilState(tagListState);
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    const URL = '/api/v1/member/info';
    try {
      const result = await fetchData.get(URL);
      setUserInfo(() => result.data);
      return result.data;
    } catch (err: any) {
      console.log(err);
      removeAccessToken();
    }
  };

  const getTags = async () => {
    const URL = '/api/v1/song/tag';
    try {
      const result = await fetchData.get(URL);
      setTagList(() => result.data);
      return result.data;
    } catch (err: any) {
      console.log(err);
    }
  };

  const getShortsList = async () => {
    const URL = '/api/v1/shorts/random';
    try {
      const result = await fetchData.get(URL);
      setShortsList(() => result.data);
      setShortsLength(() => result.data.length);
      return result.data;
    } catch (err: any) {
      console.log(err);
    }
  };

  const getShortsHotList = async () => {
    const URL = '/api/v1/shorts/popular';
    try {
      const result = await fetchData.get(URL);
      setShortsHotList(() => result.data);
      setShortsHotLength(() => result.data.length);
      return result.data;
    } catch (err: any) {
      console.log(err);
    }
  };

  const getReccomendList = async () => {
    const URL = '/api/v1/recommend';
    try {
      const result = await fetchData.get(URL);
      result.data['lowList'] = _.shuffle(result.data['lowList']);
      result.data['fitList'] = _.shuffle(result.data['fitList']);
      result.data['highList'] = _.shuffle(result.data['highList']);
      setReccommendSongs(() => result.data);
      return result.data;
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    const syncFunc = async () => {
      await getUserInfo();
      await getShortsList();
      await getShortsHotList();
      await getReccomendList();
      await getTags();
      setLoading(false);
    };
    syncFunc();
  }, []);

  const loadingSpinner = () => {
    return (
      <LoadingSpinerBox>
        <InnerBox>
          <Header />
          <SpinnerBox>
            <VoiceButtonBorder />
            <LoadingSign>
              <p>Loading</p>
            </LoadingSign>
          </SpinnerBox>
          <NavBar></NavBar>
        </InnerBox>
      </LoadingSpinerBox>
    );
  };

  return <>{loading ? loadingSpinner() : <Outlet></Outlet>}</>;
};

const LoadingSpinerBox = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InnerBox = styled.div`
  width: 100%;
  max-width: 420px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const LoadingSign = styled.div`
  position: absolute;
  font-size: 26px;
  color: white;
  z-index: 1;
  p {
    text-shadow: 0px 0px 6px rgba(0, 1, 0, 0.6);
  }
`;

const SpinnerBox = styled.div`
  width: 100%;
  max-width: 420px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default LoadingSpinner;
