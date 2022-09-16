import styled from "styled-components";

const UserProfile = () => {
  return (
    <ProfileBox>유저의 프로필 공간</ProfileBox>
  )
}

const ProfileBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
`

export default UserProfile;