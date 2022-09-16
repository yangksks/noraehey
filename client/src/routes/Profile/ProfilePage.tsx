import styled from 'styled-components'
import UserProfile from './UserProfile';
import UserShorts from './UserShorts';

const ProfilePage = () => {
  return (
    <Container>
      <ProfileBox>
        <UserProfile />
      </ProfileBox>
      <ShortsBox>
        <UserShorts />
      </ShortsBox>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: salmon;
`;

const ProfileBox = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const ShortsBox = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

`
export default ProfilePage;