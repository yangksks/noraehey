import axios from 'axios';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const REDIRECT_URL = 'https://j7a503.p.ssafy.io/api/v1/kakao/callback';

const KakaoRedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split('=')[1];

  const tokenRequest = async () => {
    const result = await axios.get(`${REDIRECT_URL}?code=${KAKAO_CODE}`);
    const { accessToken, refreshToken } = result.data;
    localStorage.setItem('refreshToken', refreshToken);
    sessionStorage.setItem('accessToken', accessToken);
    console.log(result);
    navigate('/');
  };

  useEffect(() => {
    tokenRequest();
  }, []);
  return <Container></Container>;
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default KakaoRedirectHandler;
