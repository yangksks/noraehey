import styled from 'styled-components';

const Menu = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  height: calc(var(--vh, 1vh) * 10);
  background-color: white;
`;

export const MenuBar = () => {
  return <Menu>MenuBar</Menu>;
};
