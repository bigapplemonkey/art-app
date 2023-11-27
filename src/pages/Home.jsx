import { useState } from 'react';
import { searchArtworks, searchArtists, searchCategory } from '../api/artic.js';
import SearchForm from '../components/SearchForm.jsx';
import ArtworkGrid from '../components/artworks/ArtworkGrid.jsx';
import ArtistGrid from '../components/artists/ArtistGrid.jsx';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const [filter, setFilter] = useState(null);
  const { data: result, error } = useQuery({
    queryKey: ['search', filter],
    queryFn: () => {
      let result;
      if (filter.searchOption === 'artists') {
        result = searchArtists(filter.q);
      } else if (filter.searchOption === 'categories') {
        result = searchCategory(filter.q);
      } else {
        result = searchArtworks(filter.q);
      }
      return result;
    },
    enabled: !!filter,
    refetchOnWindowFocus: false,
  });

  const apiDataError = error?.message;
  const apiData = result?.data;
  const gridType = filter?.searchOption;

  const onSearch = async ({ q, searchOption }) => {
    setFilter({ q, searchOption });
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error occured: {apiDataError.message}</div>;
    }

    if (apiData) {
      if (gridType === 'artists') return <ArtistGrid artists={apiData} />;
      else return <ArtworkGrid artworks={apiData} />;
    }

    return null;
  };

  return (
    <div>
      <SearchForm onSearch={onSearch} />
      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;
