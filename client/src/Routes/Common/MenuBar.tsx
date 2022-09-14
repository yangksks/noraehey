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
  height: calc(var(--vh, 1vh) * 13);
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.15);
`;

const MenuButton = styled.div<{ urlNow: boolean }>`
  width: 10vh;
  height: 10vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 3px;
  p {
    font-family: 'omni035';
    font-size: 10px;
  }
  transition: 0.5s;
  border-radius: 40px;
  -webkit-tap-highlight-color: transparent;
  transform: translateY(${({ urlNow }) => (urlNow ? '-5vh' : '')});
  &::after {
    content: '';
    position: absolute;
    width: 10vh;
    height: 10vh;
    border: 3px solid transparent;
    border-radius: 50%;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(to right, #ad24b9 0%, #9f10d1 50%, #571adb 100%);
    background-origin: border-box;
    background-clip: ${({ urlNow }) =>
      urlNow ? 'padding-box, border-box' : 'border-box'};
    transition: 0.3s;
    z-index: -100;
    box-shadow: ${({ urlNow }) =>
      urlNow ? '0px -2px 4px rgba(0, 0, 0, 0.2)' : ''};
  }
`;

const HomeIcon = styled(AiOutlineHome)`
  font-size: 2em;
`;

const LikedSongIcon = styled(BiBookHeart)`
  font-size: 2em;
`;

const HeyShortsIcon = styled(BsCollectionPlay)`
  font-size: 2em;
`;

const SearchIcon = styled(BiSearch)`
  font-size: 2em;
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
        <p>홈</p>
      </MenuButton>
      <MenuButton
        urlNow={urlNow === 'songs'}
        onClick={() => {
          setUrlNow('songs');
        }}>
        <LikedSongIcon />
        <p>애창곡노트</p>
      </MenuButton>
      <MenuButton
        urlNow={urlNow === 'shorts'}
        onClick={() => {
          setUrlNow('shorts');
        }}>
        <HeyShortsIcon />
        <p>HEY쇼츠</p>
      </MenuButton>
      <MenuButton
        urlNow={urlNow === 'search'}
        onClick={() => {
          setUrlNow('search');
        }}>
        <SearchIcon />
        <p>노래검색</p>
      </MenuButton>
    </Menu>
  );
};

export default MenuBar2;
