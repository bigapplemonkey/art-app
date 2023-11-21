import { useState } from 'react';
import { searchArtworks, searchArtists } from '../api/artic.js';

const Home = () => {
  const [searchStr, setSearchStr] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);
  const [searchOption, setSearchOption] = useState('artworks');

  const onSearchInputChange = ev => {
    setSearchStr(ev.target.value);
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  const onSearch = async ev => {
    ev.preventDefault();

    try {
      setApiDataError(null);

      if (searchOption === 'artworks') {
        const result = await searchArtworks(searchStr);
        setApiData(result.data);
      } else {
        const result = await searchArtists(searchStr);
        setApiData(result.data);
      }
    } catch (error) {
      setApiDataError(error);
    }
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error occured: {apiDataError.message}</div>;
    }

    if (apiData) {
      return apiData.map(data => (
        <div key={data.id}>
          <b>{data.title}</b> by{' '}
          {searchOption === 'artworks' ? data.artist_title : ''} -{' '}
          {searchOption === 'artworks' ? data.style_title : ''} -{' '}
          {searchOption === 'artworks' ? data.category_titles : ''} -{' '}
          {searchOption === 'artworks' ? data.term_titles : ''} -{' '}
          <b>{data.id}</b>
        </div>
      ));
    }

    return null;
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        <input type="text" value={searchStr} onChange={onSearchInputChange} />
        <label>
          Artworks
          <input
            type="radio"
            name="search-option"
            value="artworks"
            checked={searchOption === 'artworks'}
            onChange={onRadioChange}
          />
        </label>
        <label>
          Artists
          <input
            type="radio"
            name="search-option"
            value="artists"
            checked={searchOption === 'artists'}
            onChange={onRadioChange}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;
