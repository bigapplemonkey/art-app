import { useState } from 'react';
import { artworkByArtist } from '../../api/artic';
import ArtworkGrid from './ArtworkGrid';
import { useQuery } from '@tanstack/react-query';

const ArtworkDetails = ({
  image,
  title,
  dateDisplay,
  artistDisplay,
  description,
  artistTitle,
  placeOfOrigin,
  mediumDisplay,
  dimensions,
  creditLine,
  isOnView,
  mainReferenceNumber,
  styleTitle,
  categoryTitles,
  termTitles,
  publicationHistory,
  exhibitionHistory,
  artistId,
}) => {
  //   const [artist, setArtist] = useState(artistId);
  const { data: result, error } = useQuery({
    queryKey: ['artist', artistId],
    queryFn: () => {
      return artworkByArtist(artistId);
    },
  });

  const artworkByArtistError = error?.message;
  const artworkByArtistData = result?.data;

  const renderArtworkByArtist = () => {
    if (artworkByArtistError) return <p>{artworkByArtistError}</p>;
    if (artworkByArtistData)
      return <ArtworkGrid artworks={artworkByArtistData} />;
    return <p>Loading Artwork...</p>;
  };

  return (
    <div>
      <img
        src={`https://www.artic.edu/iiif/2/${image}/full/843,/0/default.jpg`}
        alt={title}
      />
      <h1>
        {title} - <b>{isOnView ? 'On View' : 'Currently Off View'}</b>
      </h1>
      <h2>{dateDisplay}</h2>
      <p
        dangerouslySetInnerHTML={{
          __html: artistDisplay?.replace(/(?:\r\n|\r|\n)/g, '<br>'),
        }}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />{' '}
      <h3>{artistTitle}</h3>
      <h4>{placeOfOrigin}</h4>
      <h4>{mediumDisplay}</h4>
      <h4>{styleTitle}</h4>
      <h4>{dimensions}</h4>
      <h4>{creditLine}</h4>
      <h4>{mainReferenceNumber}</h4>
      <ul>
        {categoryTitles.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
        {termTitles.map((term, index) => (
          <li key={index}>{term}</li>
        ))}
      </ul>
      <h4>Publication History</h4>
      <p
        dangerouslySetInnerHTML={{
          __html: publicationHistory?.replace(/(?:\r\n|\r|\n)/g, '<br>'),
        }}
      />
      <h4>Exhibition History</h4>
      <p
        dangerouslySetInnerHTML={{
          __html: exhibitionHistory?.replace(/(?:\r\n|\r|\n)/g, '<br>'),
        }}
      />
      <h4>Other Artwork by Artist</h4>
      {renderArtworkByArtist()}
    </div>
  );
};

export default ArtworkDetails;
