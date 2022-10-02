import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SettingPage = () => {
  const navigate = useNavigate();
  return (
    <SettingContainer>
      <ShortsTitle>Setting</ShortsTitle>
      <SettingCard
        onClick={() => {
          navigate('/voice');
        }}>
        <p>최고음 측정</p>
        <p className="description">도# 3옥타브</p>
      </SettingCard>
      <SettingCard
        onClick={() => {
          navigate('/tag');
        }}>
        <p>태그 선택</p>
        <p className="description">7개</p>
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

  .description {
    font-size: 16px;
    color: gray;
  }
`;

export default SettingPage;
