import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../../Atom';
import { fetchData } from '../../utils/api/api';
import VoiceButtonBorder from '../HighNote/VoiceButtonBorder';
import CoupleSinging from '../../assets/images/coupleSinging.png';
import Singing from '../../assets/images/singing.png';

const LoadingSpiner = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    const URL = '/api/v1/member/info';
    try {
      const result = await fetchData.get(URL);
      setUserInfo(result.data);
      console.log('spiner launched');
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const loadingSpiner = () => {
    return (
      <LoadingSpinerBox>
        <ImgBox src={Singing} />
        <VoiceButtonBorder />
        <LoadingSign>
          <p>Loading</p>
        </LoadingSign>
        <ImgBox2 src={CoupleSinging} />
      </LoadingSpinerBox>
    );
  };

  return <>{loading ? loadingSpiner() : <Outlet></Outlet>}</>;
};

const LoadingSpinerBox = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background: ${(props) => props.theme.colors.gradientPurpleToYellow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const ImgBox = styled.img`
  position: absolute;
  top: -20px;
  height: 35%;
  opacity: 0.3;
  z-index: 0;
`;

const ImgBox2 = styled.img`
  position: absolute;
  bottom: 0;
  height: 35%;
  opacity: 0.3;
  z-index: 0;
`;
export default LoadingSpiner;
