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
      <button
        onClick={() => {
          navigate(`/profile/${userId}`);
        }}>
        마이페이지
      </button>
      <button
        onClick={() => {
          logout();
        }}>
        로그아웃
      </button>
    </HeaderButtonsBox>
  );
};

const HeaderButtonsBox = styled.div`
  width: 100%;
  background-color: yellow;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 10px;
`;

export default HeaderButtons;
