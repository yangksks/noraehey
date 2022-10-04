import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { tagListState, userInfoState, userTagListState } from '../../Atom';
import { fetchData } from '../../utils/api/api';

const TagVoiceProtection = () => {
  const loggedData = sessionStorage.getItem('accessToken');
  const [tagList, setTagList] = useRecoilState(tagListState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [userTags, setUserTags] = useRecoilState(userTagListState);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  const getUserInfo = async () => {
    const URL = '/api/v1/member/info';
    try {
      const result = await fetchData.get(URL);
      setUserInfo(result.data);
      setUserTags(result.data.memberTagList);
    } catch (err: any) {
      console.log(err);
      logout();
    }
  };

  const getTags = async () => {
    const URL = '/api/v1/song/tag';
    try {
      const result = await fetchData.get(URL);
      setTagList((tagList) => result.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    const syncFunc = async () => {
      await getUserInfo();
      await getTags();
      setLoading(false);
    };
    syncFunc();
  }, []);

  if (!loggedData) {
    return <Navigate to="/login" replace />;
  } else {
    return (
      <>
        {loading ? null : (
          <Container>
            <MobileContainer>
              <Outlet></Outlet>
            </MobileContainer>
          </Container>
        )}
      </>
    );
  }
};

const MobileContainer = styled.div`
  width: 100%;
  max-width: 420px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default TagVoiceProtection;
