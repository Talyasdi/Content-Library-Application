import useTrailers from '../../hooks/useTrailers';
import styles from './LibraryView.module.css';
import Trailer from '../../components/TrailerLibraryView/TrailerView';

const LibraryView = () => {
  const { trailers, loading, error } = useTrailers();

  if (loading) return <p>Loading Trailers...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div  className={styles.trailerList}>
      {trailers.map((trailer) => (
        <Trailer trailer={trailer} />
      ))}
    </div>
  );
};

export default LibraryView;