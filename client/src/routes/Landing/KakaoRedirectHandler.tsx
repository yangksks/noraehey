import axios from 'axios';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//const SERVER_CALLBACK_URL = 'http://localhost:8081/api/v1/kakao/callback';
const SERVER_CALLBACK_URL = 'https://j7a503.p.ssafy.io/api/v1/kakao/callback';

const CLIENT_ID = '7751ec01f50361d6bce9db46f9383a9a';
const REDIRECT_URL = 'https://j7a503.p.ssafy.io/api/v1/kakao/callback';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;

const KakaoRedirectHandler = () => {
  const location = useLocation();

  const KAKAO_CODE = location.search.split('=')[1];

  const tokenRequest = async () => {
    const result = await axios.get(KAKAO_AUTH_URL);
    console.log(result);
  };

  useEffect(() => {
    tokenRequest();
  });
  return (
    <Container>
    </Container>
  );
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
