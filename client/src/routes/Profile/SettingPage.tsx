import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../../Atom';
import { keyList } from '../../utils/constants/constants';

const SettingPage = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userInfoState);
  return (
    <SettingContainer>
      <ShortsTitle>Setting</ShortsTitle>
      <SettingCard
        onClick={() => {
          navigate('/voice');
        }}>
        <p>최고음 측정</p>
        <p className="description">{keyList[user.memberHighPitch]}</p>
      </SettingCard>
      <SettingCard
        onClick={() => {
          navigate('/tag');
        }}>
        <p>태그 선택</p>
        <p className="description">{user.memberTagList.length}개</p>
      </SettingCard>
      <SettingCard
        onClick={() => {
          alert('아직 탈퇴가 불가능 합니다.');
        }}>
        회원 탈퇴
      </SettingCard>
    </SettingContainer>
  );
};

const SettingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const ShortsTitle = styled.div`
  width: 100%;
  padding: 0 20px;

  &::after {
    display: block;
    content: '';
    width: 100%;
    height: 2px;
    margin-top: 10px;
    background-color: ${(props) => props.theme.colors.lineGray};
  }
`;

const SettingCard = styled.div`
  width: 100%;
  font-size: 22px;
  padding: 20px 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  font-family: 'omni025';
  cursor: pointer;
  &:active {
    scale: 0.95;
    opacity: 0.8;
  }

  .description {
    font-size: 16px;
    color: gray;
  }
`;

export default SettingPage;
