import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../../Atom';
import Header from './Header';
import NavBar from './NavBar';

const Protection = () => {
  const loggedData = sessionStorage.getItem('accessToken');
  const url = useLocation().pathname.split('/')[1];
  const [headerStatus, setHeaderStatus] = useState(false);
  const [navStatus, setNavStatus] = useState(false);
  const user = useRecoilValue(userInfoState);

  useEffect(() => {
    if (url === 'tag' || url === 'voice' || url === 'shorts') {
      setHeaderStatus(false);
    } else {
      setHeaderStatus(true);
    }

    if (url === 'tag' || url === 'voice') {
      setNavStatus(false);
    } else {
      setNavStatus(true);
    }
  }, [url]);

  if (user.memberTagList.length === -1) {
    return <Navigate to="/tag" replace />;
  } else if (user.memberHighPitch === -1) {
    return <Navigate to="/voice" replace />;
  } else if (!loggedData) {
    return <Navigate to="/login" replace />;
  } else {
    return (
      <Container>
        <MobileContainer>
          {headerStatus ? <Header /> : null}
          <Outlet></Outlet>
          {navStatus ? <NavBar /> : null}
        </MobileContainer>
      </Container>
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

export default Protection;
