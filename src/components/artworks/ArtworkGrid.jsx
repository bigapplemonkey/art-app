import ArtworkCard from './ArtworkCard';

const ArtworkGrid = ({ artworks }) => {
  console.log(artworks);
  return (
    <div>
      {artworks.map(artwork => (
        <ArtworkCard
          key={artwork.id}
          id={artwork.id}
          title={artwork.title}
          artist={artwork.artist_title}
          date={artwork.date_display}
          image={artwork.image_id}
          categoryTitles={artwork.category_titles}
          termTitles={artwork.term_titles}
        />
      ))}
    </div>
  );
};

export default ArtworkGrid;
