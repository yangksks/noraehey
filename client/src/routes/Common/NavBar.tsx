import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { useState } from 'react';

const NavBar = () => {
  const [infoBar, setInfoBar] = useState(false);
  return (
    <Nav>
      <NavTop infoBar={infoBar === true}>
        <TopBox>
          <Logo>
            <p style={{ color: '#FFC34E' }}>NORAE</p>
            <p style={{ color: 'white' }}>HEY</p>
          </Logo>
          <ProfileImg
            onClick={() => {
              setInfoBar(!infoBar);
            }}
          />
        </TopBox>
      </NavTop>
      <BottomBox>
        <NavBottom />
        <NavBottom2 />
      </BottomBox>
    </Nav>
  );
};

const Nav = styled.div`
  width: 100%;
  position: relative;
  background: white;
  z-index: 0;
`;

const TopBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BottomBox = styled.div`
  width: 100%;
`;

const NavTop = styled.div<{ infoBar: boolean }>`
  width: 100%;
  padding: 20px;
  height: ${({ infoBar }) => (infoBar ? '220px' : '80px')};
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  border-radius: 0 0 30px 0;
  background: #a793ff;
  font-family: 'omni035';
  font-size: 24px;
  box-sizing: border-box;
  transition: all 0.25s ease;
`;

const NavBottom = styled.div`
  width: 100%;
  height: 30px;
  position: absolute;
  border-radius: 30px 0 0 0;
  background: white;
  z-index: 2;
`;

const NavBottom2 = styled.div`
  width: 100%;
  height: 30px;
  position: relative;
  background: #a793ff;
  z-index: 1;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  font-size: 20px;
  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const ProfileImg = styled(CgProfile)`
  width: 40px;
  height: 40px;
  color: #ffffff;
  border-radius: 50px;
`;

export default NavBar;
