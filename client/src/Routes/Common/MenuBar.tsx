import { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineHome } from 'react-icons/ai';
import { BiBookHeart, BiSearch } from 'react-icons/bi';
import { BsCollectionPlay } from 'react-icons/bs';

const Menu = styled.div`
  width: 100%;
  padding: 0 20px;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 5px;
  width: 100%;
  bottom: 0;
  height: 8%;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
`;

const MenuButton = styled.div<{ urlNow: boolean }>`
  height: 100%;
  scale: ${({ urlNow }) => (urlNow ? '1.1' : 1)};
  width: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 3px;
  transition: 0.3s;
  border-radius: 40px;
  -webkit-tap-highlight-color: transparent;
  transform: translateY(${({ urlNow }) => (urlNow ? '-25%' : '')});
  
  p {
    font-family: 'omni035';
    font-size: 10px;
  }

  &::after {
    content: '';
    position: absolute;
    width: 7vh;
    height: 7vh;
    border: 2px solid transparent;
    border-radius: 50%;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(to right, #ad24b9 0%, #9f10d1 50%, #571adb 100%);
    background-origin: border-box;
    background-clip: ${({ urlNow }) =>
      urlNow ? 'padding-box, border-box' : 'border-box'};
    background: ${({ urlNow }) => (urlNow ? '' : 'transparent')};
    box-shadow: ${({ urlNow }) =>
      urlNow
      ? '0px -1px 1px rgba(0, 0, 0, 0.3)'
      : ''};
    z-index: -100;
  }
`;

const HomeIcon = styled(AiOutlineHome)`
  font-size: 2.0em;
`;

const LikedSongIcon = styled(BiBookHeart)`
  font-size: 2.0em;
`;

const HeyShortsIcon = styled(BsCollectionPlay)`
  font-size: 2.0em;
`;

const SearchIcon = styled(BiSearch)`
  font-size: 2.0em;
`;

const MenuBar2 = () => {
  const [urlNow, setUrlNow] = useState('home');

  return (
    <Menu>
      <MenuButton
        urlNow={urlNow === 'home'}
        onClick={() => {
          setUrlNow('home');
        }}>
        <HomeIcon />
      </MenuButton>
      <MenuButton
        urlNow={urlNow === 'songs'}
        onClick={() => {
          setUrlNow('songs');
        }}>
        <LikedSongIcon />
      </MenuButton>
      <MenuButton
        urlNow={urlNow === 'shorts'}
        onClick={() => {
          setUrlNow('shorts');
        }}>
        <HeyShortsIcon />
      </MenuButton>
      <MenuButton
        urlNow={urlNow === 'search'}
        onClick={() => {
          setUrlNow('search');
        }}>
        <SearchIcon />
      </MenuButton>
    </Menu>
  );
};

export default MenuBar2;
