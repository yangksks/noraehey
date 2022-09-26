import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../../style/style';
import SubTitle from '../Common/SubTitle';
import ShortsCard from '../Like/ShortsCard';
const ProfilePage = () => {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState({
    memberNickname: 'msms',
    memberProfileUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfpOT0FBFEuFxh-A3o9yHwmuCa7QHSANOg7w&usqp=CAU',
  });
  const [shortsList, setShortsList] = useState();

  return (
    <Container>
      <SubTitle title=""></SubTitle>
      <Profile>
        <img src={userInfo.memberProfileUrl} alt="" />
        <p>{userInfo.memberNickname}</p>
      </Profile>
      <ShortsTitle>Hey Shorts</ShortsTitle>
      <ShortsList>
        <ShortsCard albumUrl={userInfo.memberProfileUrl}></ShortsCard>
        <ShortsCard albumUrl={userInfo.memberProfileUrl}></ShortsCard>
        <ShortsCard albumUrl={userInfo.memberProfileUrl}></ShortsCard>
        <ShortsCard albumUrl={userInfo.memberProfileUrl}></ShortsCard>
        <ShortsCard albumUrl={userInfo.memberProfileUrl}></ShortsCard>
        <ShortsCard albumUrl={userInfo.memberProfileUrl}></ShortsCard>
      </ShortsList>
    </Container>
  );
};

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
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
const ShortsList = styled.div`
  width: 100%;
  padding: 10px 20px 0;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, minmax(auto, 300px));
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 10px;
`;
export default ProfilePage;
