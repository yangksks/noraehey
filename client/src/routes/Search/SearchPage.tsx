import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Container from '../../style/style';
import { fetchData } from '../../utils/api/api';
import LikeSongCard from '../Like/LikeSongCard';
import SearchSingerPage from './SearchSingerPage';
import SearchSongPage from './SearchSongPage';
const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [nowTab, setNowTab] = useState(1);
  const [prevText, setPrevText] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (prevText !== searchText) {
      fetchData
        .get(`/api/v1/song/search?key=${nowTab}&word=${searchText}&page=0`)
        .then((res) => {
          setSearchList(res.data.songEntityResList);
          setPrevText(searchText);
        });
      navigate({
        pathname: '/search',
        search: `?key=${nowTab}&word=${searchText}`,
      });
      console.log('검색함');
    }
  }, [nowTab]);

  return (
    <Container>
      <SearchForm>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchData
              .get(
                `/api/v1/song/search?key=${nowTab}&word=${searchText}&page=0`,
              )
              .then((res) => {
                setSearchList(res.data.songEntityResList);
              });
            navigate({
              pathname: '/search',
              search: `?key=${nowTab}&word=${searchText}`,
            });
          }}>
          <input
            placeholder="검색어를 입력하세요"
            type="text"
            onChange={({ target: { value } }) => {
              setSearchText(value);
            }}
          />
        </form>
      </SearchForm>
      <TabSection>
        <ul>
          <NavStyle
            active={nowTab === 1}
            onClick={() => {
              setNowTab(1);
            }}>
            곡명
          </NavStyle>
          <NavStyle
            active={nowTab === 2}
            onClick={() => {
              setNowTab(2);
            }}>
            가수명
          </NavStyle>
        </ul>
      </TabSection>
      <ListArticle>
        <Routes>
          <Route path="songlist" element={<SearchSongPage />} />
          <Route path="singerlist" element={<SearchSingerPage />} />
        </Routes>
      </ListArticle>
      <SearchResult>
        {searchList.length !== 0 ? (
          searchList.map((item, i) => (
            <LikeSongCard songData={item} key={i}></LikeSongCard>
          ))
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}
      </SearchResult>
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
const NavStyle = styled.li<{ active: boolean }>`
  display: block;
  padding: 10px 0;

  ${(props) =>
    props.active &&
    css`
      border-bottom: 2px solid ${(props) => props.theme.colors.textGray};
    `}
`;

const ListArticle = styled.article`
  width: 100%;
  padding: 0 20px;
`;
const SearchForm = styled.div`
  width: 100%;
  padding: 10px 0;
  text-align: center;
  input {
    outline: none;
    padding: 0 10px;
    height: 35px;
    width: 70%;
    background-color: ${(props) => props.theme.colors.lineGray};
    border: none;
    border-radius: 10px;
  }
`;
const SearchResult = styled.div`
  width: 100%;
  padding: 0 20px;
`;

export default SearchPage;
