import useTrailers from '../../hooks/useTrailers';
import styles from './LibraryView.module.css';
import Trailer from '../../components/TrailerLibraryView/TrailerView';
import Pagination from '../../components/Pagination/Pagination';

const LibraryView = () => {
  const { trailers, loading, error, pagination, notFound } = useTrailers();

  // if (error) return <p>{error}</p>;

  // if (loading) return <p>Loading Trailers...</p>;

  // if(notFound && !loading) return <p>No appropriate trailers found for this user.</p>

  return (
    <div>
    {error && <p>{error}</p>}
    {
      trailers.length > 0 ? (
        <div className={styles.pageContainer}>
        <div  className={styles.trailersContainer}>
         {trailers.map((trailer) => (
          <div key={trailer._id}>
            <Trailer trailer={trailer} />
            </div>
          ))}
        </div>
  
        <div className="pagination">
          <Pagination
              pagination={pagination}
          />
        </div>
  
      </div>
      ) : loading ? (
        <p>Loading Trailers...</p>

  ): 
        //  ):
          (
            // this will appear on screen for ms before updating loading and trailers
    <p>No appropriate trailers found for this user.</p> 
  )
  }
    
  </div>
  );
};

export default LibraryView;