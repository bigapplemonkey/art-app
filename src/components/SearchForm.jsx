import { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [searchStr, setSearchStr] = useState('');
  const [searchOption, setSearchOption] = useState('artworks');

  const onSearchInputChange = ev => {
    setSearchStr(ev.target.value);
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  const onSubmit = ev => {
    ev.preventDefault();

    const options = {
      q: searchStr,
      searchOption,
    };

    onSearch(options);
  };

  return (
    <form onSubmit={onSubmit}>
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
      <label>
        Category
        <input
          type="radio"
          name="search-option"
          value="categories"
          checked={searchOption === 'categories'}
          onChange={onRadioChange}
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
