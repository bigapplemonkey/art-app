export default function AppTitle(props) {
  const {
    title = 'Art Search',
    subtitle = 'Are you looking for an artwork or an artist?',
  } = props;

  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}
