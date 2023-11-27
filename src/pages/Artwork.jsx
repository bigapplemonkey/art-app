import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { instanceById } from '../api/artic';
import ArtworkDetails from '../components/artworks/ArtworkDetails';

const Artwork = () => {
  const { artworkId } = useParams();
  const { data: result, error } = useQuery({
    queryKey: ['artwork', artworkId],
    queryFn: () => instanceById(artworkId, 'artwork'),
  });
  const artworkError = error?.message;
  const artworkData = result?.data;

  if (artworkError) {
    return <div>We have an error: {artworkError}</div>;
  }

  if (artworkData) {
    return (
      <>
        <div>Got artwork data: {artworkData.title}</div>
        <ArtworkDetails
          image={artworkData.image_id}
          title={artworkData.title}
          dateDisplay={artworkData.date_display}
          artistDisplay={artworkData.artist_display}
          description={artworkData.description}
          artistTitle={artworkData.artist_title}
          placeOfOrigin={artworkData.place_of_origin}
          mediumDisplay={artworkData.medium_display}
          creditLine={artworkData.credit_line}
          dimensions={artworkData.dimensions}
          isOnView={artworkData.is_on_view}
          mainReferenceNumber={artworkData.main_reference_number}
          styleTitle={artworkData.style_title}
          categoryTitles={artworkData.category_titles}
          termTitles={artworkData.term_titles}
          publicationHistory={artworkData.publication_history}
          exhibitionHistory={artworkData.exhibition_history}
          artistId={artworkData.artist_id}
        />
      </>
    );
  }

  return <div>Artwork data is loading</div>;
};

export default Artwork;
