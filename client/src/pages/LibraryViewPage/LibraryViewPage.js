import Trailer from '../../components/TrailerLibraryView/TrailerView';
import Pagination from '../../components/Pagination/Pagination';
import styles from '../LibraryViewPage/LibraryView.module.css'; // Import CSS file
import { useLocation } from 'react-router-dom';

const LibraryView = ({ trailers, loading, error, pagination, notFound, filters }) => {
  const location = useLocation();
  const { currPage, totalPages } = pagination;

  // Get filters and page details from location state or fallback to default props
  const restoredFilters = location.state?.filters || filters;
  const filteredPages = location.state?.getPages || totalPages;

  return (
    <div>
      {error && <p>{error}</p>}
      {
        trailers.length > 0 ? (
          <div className={styles.pageContainer}>
            <h2>Discover Your Next Favorite Trailer!</h2>
            <ul className={styles.trailerList}>
              <div className={styles.trailersContainer}>
                {trailers.map((trailer) => (
                  <li key={trailer._id}>
                    <Trailer trailer={trailer} activePage={currPage} filters={restoredFilters} />
                  </li>
                ))}
              </div>
            </ul>
            <Pagination pagination={pagination} />
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
