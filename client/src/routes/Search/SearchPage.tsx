import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Container from '../../style/style';
import { fetchData } from '../../utils/api/api';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../Atom';
import SongCard from '../Home/SongCard';
import { BiSearch } from 'react-icons/bi';
const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [nowTab, setNowTab] = useState(1);
  const [prevText, setPrevText] = useState('');
  const userKey = useRecoilValue(userInfoState).memberHighPitch;
  const navigate = useNavigate();
  useEffect(() => {
    fetchData
      .get(`/api/v1/song/search?key=${nowTab}&word=${searchText}&page=0`)
      .then((res) => {
        setSearchList(res.data.songEntityResList);
      });
    navigate({
      pathname: '/search',
      search: `?key=${nowTab}&word=${searchText}`,
    });
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
          <input type="submit" id="search" />
          <label className="search" htmlFor="search">
            <BiSearch size={28} />
          </label>
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
      <SearchResult>
        {searchList.length !== 0 ? (
          searchList.map((item, i) => (
            <SongCard key={i} songData={item} userInfo={userKey} />
          ))
        ) : (
          <NoData>검색 결과가 없습니다.</NoData>
        )}
      </SearchResult>
    </Container>
  );
};
const NoData = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.textGray};
`;
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
  cursor: pointer;
  &:active {
    scale: 0.95;
    opacity: 0.8;
  }
  ${(props) =>
    props.active &&
    css`
      border-bottom: 2px solid ${(props) => props.theme.colors.textGray};
    `}
`;

const SearchForm = styled.div`
  width: 100%;
  padding: 10px 0;
  text-align: center;

  form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    input[type='text'] {
      outline: none;
      padding: 0 10px;
      height: 35px;
      width: 70%;
      background-color: ${(props) => props.theme.colors.lineGray};
      border: none;
      border-radius: 10px;
      flex-shrink: 0;
    }
    input[type='submit'] {
      display: none;
    }
    label {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:active {
        scale: 0.95;
        opacity: 0.8;
      }
    }
  }
`;
const SearchResult = styled.div`
  width: 100%;
  padding: 0 20px;
`;

export default SearchPage;
