import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import NavBar from './NavBar';

const Protection = () => {
  const loggedData = sessionStorage.getItem('accessToken');
  const url = useLocation().pathname.split('/')[1];
  const [headerStatus, setHeaderStatus] = useState(false);
  const [navStatus, setNavStatus] = useState(false);

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

  if (!loggedData) {
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
