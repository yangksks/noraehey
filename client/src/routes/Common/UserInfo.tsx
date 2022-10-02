import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../../Atom';
import HeaderButtons from './HeaderButtons';

const UserInfo = () => {
  const user = useRecoilValue(userInfoState);
  const userName = user.nickName.split('#')[0];

  return (
    <InfoBox>
      <InfoBoxLeft></InfoBoxLeft>
      <InfoBoxRight>
        <p>{userName} 님</p>
        <p>노래HEY와 함께</p>
        <p>노래방 달려볼까요?</p>
        <HeaderButtons />
      </InfoBoxRight>
    </InfoBox>
  );
};

const InfoBox = styled.div`
  width: 100%;
  height: 70%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: tomato;
  box-sizing: border-box;
  overflow: hidden;
`;

const InfoBoxLeft = styled.div`
  width: 30%;
  height: 100%;
`;
const InfoBoxRight = styled.div`
  width: 70%;
  height: 100%;
  background-color: skyblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  p {
    font-size: 18px;
  }
`;

export default UserInfo;
