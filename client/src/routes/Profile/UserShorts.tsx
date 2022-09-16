import styled from "styled-components";

const UserShorts = () => {
  return (
    <ShortsBox>유저가 올린 쇼츠 공간</ShortsBox>
  )
}

const ShortsBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: skyblue;
`

export default UserShorts;