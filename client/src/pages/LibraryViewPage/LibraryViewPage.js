import useTrailers from '../../hooks/useTrailers';
import Trailer from '../../components/TrailerLibraryView/TrailerView';
import Pagination from '../../components/Pagination/Pagination';
import styles from '../LibraryViewPage/LibraryView.module.css';

const LibraryView = () => {
  const { trailers, loading, error, pagination, notFound } = useTrailers();
  return (
    <div>
    {error && <p>{error}</p>}
    {
      trailers.length > 0 ? (
        <div className={styles.pageContainer}>
          <h2>Discover Your Next Favorite </h2>
          <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center', margin: '0 auto', 
          display: 'gird',justifyContent: 'center'
        }}>
        <div  className={styles.trailersContainer}>
         {trailers.map((trailer) => (
          <li key={trailer._id}>
            <Trailer trailer={trailer} />
            </li>
          ))}
        </div>
        </ul>
        <div className="pagination">
          <Pagination pagination={pagination}/>
        </div>
      </div>
      ) : loading ? (
        <p>Loading Trailers...</p>
  ): (
    // this will appear on screen for ms before updating loading and trailers
    <p>No appropriate trailers found for this user.</p> 
  )
  }
  </div>

  );
};

export default LibraryView;
