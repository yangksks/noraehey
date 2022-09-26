import styled from 'styled-components';

const TagPage = () => {
  return <TagContainer>TagPage</TagContainer>;
};

const TagContainer = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background: ${(props) => props.theme.colors.gradientPurpleToYellow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export default TagPage;
