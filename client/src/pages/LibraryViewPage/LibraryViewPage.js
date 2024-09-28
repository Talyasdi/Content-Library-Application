import Trailer from '../../components/TrailerLibraryView/TrailerView';
import Pagination from '../../components/Pagination/Pagination';
import styles from '../LibraryViewPage/LibraryView.module.css';

const LibraryView = ({ trailers, loading, error, pagination, notFound, filters}) => {
  const { currPage } = pagination; // Get current page

  return (
    <div>
       {error && <p>{error}</p>}
       {
        trailers.length > 0 ? (
          <div className={styles.pageContainer}>
            <h2>Discover Your Next Favorite </h2>
            <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center', margin: '0 auto' }}>
              <div className={styles.trailersContainer}>
                {trailers.map((trailer) => (
                  <li key={trailer._id}>
                    <Trailer trailer={trailer} activePage={currPage} filters={filters}  /> {/* Pass active page */}
                  </li>
                ))}
              </div>
            </ul>
            <div className="pagination">
              <Pagination pagination={pagination} />
            </div>
          </div>
        ) : loading ? (
          <p>Loading Trailers...</p>
        ) : (
          <p>No appropriate trailers found.</p>
        )
      }
    </div>
  );
};

export default LibraryView;


