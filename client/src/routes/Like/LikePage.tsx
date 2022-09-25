import { NavLink, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../../style/style';
import LikeShortsPage from './LikeShortsPage';
import LikeSongPage from './LikeSongPage';
const LikePage = () => {
  return (
    <Container>
      <TabSection>
        <ul>
          <li>
            <NavStyle to="songlist">음악</NavStyle>
          </li>
          <li>
            <NavStyle to="shortslist">Hey쇼츠</NavStyle>
          </li>
        </ul>
      </TabSection>
      <ListArticle>
        <Routes>
          <Route path="songlist" element={<LikeSongPage />} />
          <Route path="shortslist" element={<LikeShortsPage />} />
        </Routes>
      </ListArticle>
    </Container>
  );
};

const TabSection = styled.section`
  width: 100%;
  padding: 0 20px 10px;
  & > ul {
    display: flex;
    width: 100%;
    justify-content: space-between;
    & > li {
      width: 100%;
      text-align: center;
    }
    border-bottom: 1px solid ${(props) => props.theme.colors.textGray};
  }
`;
const NavStyle = styled(NavLink)`
  display: block;
  padding: 10px 0;

  &.active {
    border-bottom: 2px solid ${(props) => props.theme.colors.textGray};
  }
`;

const ListArticle = styled.article`
  width: 100%;
  padding: 0 20px;
`;

export default LikePage;
