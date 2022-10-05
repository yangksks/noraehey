import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../../Atom';
import HeaderButtons from './HeaderButtons';
import { keyList } from '../../utils/constants/constants';
// import { IoMusicalNotes } from 'react-icons/io5';
import { MdPiano } from 'react-icons/md';
const UserInfo = () => {
  const user = useRecoilValue(userInfoState);
  const userName = user.memberNickname;
  const levelFnc = () => {
    const n = user.memberHighPitch % 12;

    if (n == 1 || n == 2) return 'red';
    else if (n == 3 || n == 4) return 'orange';
    else if (n == 5) return 'yellow';
    else if (n == 6 || n == 7) return 'green';
    else if (n == 8 || n == 9) return 'skyblue';
    else if (n == 10 || n == 11) return 'blue';
    else return 'purple';
  };
  return (
    <InfoBox>
      <InfoBoxLeft>
        <div>
          <MdPiano size={40} color={levelFnc()} />
        </div>
        <p>{keyList[user.memberHighPitch]}</p>
      </InfoBoxLeft>
      <InfoBoxRight>
        <p className="user">
          <span>{userName}</span> 님,
        </p>
        <p className="text">NORAEHEY와 함께</p>
        <p className="text">노래방 달려볼까요?</p>
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
  /* background-color: tomato; */
  box-sizing: border-box;
  overflow: hidden;
`;

const InfoBoxLeft = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  div {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p {
    font-size: 16px;
    color: white;
    padding-top: 5px;
    font-family: 'omni025';
  }
`;
const InfoBoxRight = styled.div`
  width: 70%;
  height: 100%;
  /* background-color: skyblue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;

  .user {
    span {
      font-size: 22px;
    }
    font-size: 20px;
    font-family: 'omni045';
    color: #ffd132;
    padding-bottom: 8px;
  }
  .text {
    font-size: 16px;
    color: white;
    padding: 2px;
    font-family: 'omni025';
  }
`;

export default UserInfo;
