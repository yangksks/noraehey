import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../Atom';

const HeaderButtons = () => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  const user = useRecoilValue(userInfoState);
  const userId = user.memberId;

  return (
    <HeaderButtonsBox>
      <span
        onClick={() => {
          navigate(`/profile/${userId}`);
        }}>
        MyPage
      </span>
      <span
        onClick={() => {
          logout();
        }}>
        Logout
      </span>
    </HeaderButtonsBox>
  );
};

const HeaderButtonsBox = styled.div`
  width: 100%;
  /* background-color: yellow; */
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  span {
    background-color: transparent;
    padding: 5px;
    border: none;
    border-radius: 5px;
    font-size: 12px;
    color: ${(props) => props.theme.colors.lineGray};
    font-family: 'omni025';
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

export default HeaderButtons;
