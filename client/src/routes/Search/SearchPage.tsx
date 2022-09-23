import { useState } from 'react';
import styled from 'styled-components';
import Container from '../../style/style';
import { fetchData } from '../../utils/api/api';

const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchList] = useState([]);

  return (
    <Container>
      <SearchForm>
        <form
          onSubmit={() => {
            fetchData
              .get('/api/v1/song/search?word=피어나&page=0')
              .then((res) => {
                setSearchList(res.data.songEntityResList);
              });
          }}>
          <input
            type="text"
            onChange={({ target: { value } }) => {
              setSearchText(value);
            }}
          />
        </form>
      </SearchForm>
      <SearchResult></SearchResult>
    </Container>
  );
};

const SearchForm = styled.div``;
const SearchResult = styled.div``;

export default SearchPage;
