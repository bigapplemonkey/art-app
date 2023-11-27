import { Link } from 'react-router-dom';

const ArtworkCard = ({
  id,
  title,
  artist,
  date,
  image,
  categoryTitles,
  termTitles,
}) => {
  //   const summaryStripped = summary
  //     ? summary.split(' ').slice(0, 10).join(' ').replace(/<.+?>/g, '')
  //     : 'No description';

  return (
    <div>
      <img
        src={`https://www.artic.edu/iiif/2/${image}/full/200,/0/default.jpg`}
        alt={title}
      />

      <h2>
        {`${title}, ${date}`} - {id}
      </h2>

      <p>{artist}</p>
      <p>{categoryTitles}</p>
      <p>{termTitles}</p>

      <div>
        <Link to={`/artworks/${id}`}>Read more</Link>
        <button type="button">Star me</button>
      </div>
    </div>
  );
};

export default ArtworkCard;
