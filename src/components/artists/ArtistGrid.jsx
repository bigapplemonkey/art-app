import ArtistCard from './ArtistCard';

const ArtistGrid = ({ artists }) => {
  return (
    <div>
      {artists.map(artist => (
        <ArtistCard
          key={artist.id}
          id={artist.id}
          name={artist.title}
          birth={artist.birth_date}
          death={artist.death_date}
        />
      ))}
    </div>
  );
};

export default ArtistGrid;
