import styled from 'styled-components';

const Nav = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  background: #a793ff;
`;

const NavTop = styled.div`
  width: 100%;
  border-radius: 0 0 0 40px;
  height: calc(var(--vh, 1vh) * 10);
  background: #a793ff;
`;

const NavBottom = styled.div`
  width: 100%;
  border-radius: 40px 0 0 0;
  height: calc(var(--vh, 1vh) * 5);
  background: #ffffff;
`;

export const NavBar = () => {
  return (
    <div>
      <Nav>
        <NavTop />
        <NavBottom />
      </Nav>
    </div>
  );
};
