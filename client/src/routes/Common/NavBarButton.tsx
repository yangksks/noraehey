import styled from 'styled-components';
import { AiOutlineHome } from 'react-icons/ai';
import { BiBookHeart, BiSearch } from 'react-icons/bi';
import { BsCollectionPlay } from 'react-icons/bs';

export type ButtonType = {
  urlNow: boolean;
  name: string;
  change: Function;
};

const NavBarButton = (props: ButtonType) => {
  return (
    <MenuButton urlNow={props.urlNow} onClick={() => props.change()}>
      {
        {
          '': <AiOutlineHome />,
          like: <BiBookHeart />,
          shorts: <BsCollectionPlay />,
          search: <BiSearch />,
        }[props.name]
      }
    </MenuButton>
  );
};

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

  svg {
    font-size: 2rem;
  }

  &::after {
    content: '';
    position: absolute;
    width: 3.5rem;
    height: 3.5rem;
    border: 2px solid transparent;
    border-radius: 50%;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(to right, #ad24b9 0%, #9f10d1 50%, #571adb 100%);
    background-origin: border-box;
    background-clip: ${({ urlNow }) =>
      urlNow ? 'padding-box, border-box' : 'border-box'};
    background: ${({ urlNow }) => (urlNow ? '' : 'transparent')};
    box-shadow: ${({ urlNow }) =>
      urlNow ? '0px -1px 1px rgba(0, 0, 0, 0.3)' : ''};
    z-index: -100;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default NavBarButton;
