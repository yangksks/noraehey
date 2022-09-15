import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { useState } from 'react';

const Nav = styled.div`
  width: 100%;
  background: white;
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
  height: ${({ infoBar }) => (infoBar ? '220px' : '80px')};
  border-radius: 0 0 30px 0;
  background: #a793ff;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  font-family: 'omni035';
  padding: 20px;
  font-size: 24px;
  box-sizing: border-box;
  transition: all 0.25s ease;
`;

const NavBottom = styled.div`
  position: absolute;
  width: 100%;
  border-radius: 30px 0 0 0;
  height: 50px;
  background: white;
  z-index: 2;
`;

const NavBottom2 = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
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

const NavBarSmall = () => {
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

export default NavBarSmall;
