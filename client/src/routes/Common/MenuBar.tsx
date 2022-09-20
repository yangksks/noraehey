import { useState } from 'react';
import styled from 'styled-components';
import MenuBarButton from './MenuBarButton';

const MenuName = ['home', 'song', 'shorts', 'search'];

const MenuBar = () => {
  const [urlNow, setUrlNow] = useState('home');

  return (
    <Menu>
      {MenuName.map((name, i) => (
        <MenuBarButton
          key={i}
          urlNow={urlNow === name}
          change={() => {
            setUrlNow(name);
          }}
          name={name}
        />
      ))}
    </Menu>
  );
};

const Menu = styled.div`
  width: 100%;
  padding: 0 20px;
  padding-bottom: 10px;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 5px;
  height: 60px;
  background-color: #ffffff;
  z-index: 100;
  box-sizing: border-box;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
`;

export default MenuBar;
