import { searchArtworks, searchArtists, searchCategory } from '../api/artic.js';
import SearchForm from '../components/SearchForm.jsx';
import ArtworkGrid from '../components/artworks/ArtworkGrid.jsx';
import ArtistGrid from '../components/artists/ArtistGrid.jsx';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const [filter, setFilter] = useSearchParams({
    q: '',
    searchOption: 'artworks',
  }); //const [filter, setFilter] = useState(null);

  const q = filter.get('q');
  const searchOption = filter.get('searchOption');

  const { data: result, error } = useQuery({
    queryKey: ['search', { q, searchOption }],
    queryFn: () => {
      let result;
      if (searchOption === 'artists') {
        result = searchArtists(q);
      } else if (searchOption === 'categories') {
        result = searchCategory(q);
      } else {
        result = searchArtworks(q);
      }
      return result;
    },
    enabled: !!filter,
    refetchOnWindowFocus: false,
  });

  const apiDataError = error?.message;
  const apiData = result?.data;

  const onSearch = async ({ q, searchOption }) => {
    setFilter({ q, searchOption });
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error occured: {apiDataError.message}</div>;
    }

    if (apiData) {
      if (searchOption === 'artists') return <ArtistGrid artists={apiData} />;
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
