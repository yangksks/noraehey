import React from 'react';
import styled from 'styled-components';
import Container from '../../style/style';
const ShortsDetailPage = () => {
  return (
    <Container>
      <Shorts>
        {/* <Profile></Profile>
        <ProgressBar></ProgressBar>
        <Contents></Contents>
        <MusicBox></MusicBox> */}
      </Shorts>
    </Container>
  );
};

const Shorts = styled.div`
  width: 100%;
  background-color: red;
`;
export default ShortsDetailPage;
