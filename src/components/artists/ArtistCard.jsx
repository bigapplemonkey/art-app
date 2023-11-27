const ArtistCard = ({ id, name, birth, death }) => {
  return (
    <div>
      <h2>
        {name} - {id}
      </h2>
      <h4>
        {birth}
        {death ? ` - ${death}` : ''}
      </h4>
    </div>
  );
};

export default ArtistCard;
