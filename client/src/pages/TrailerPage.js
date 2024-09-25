import { useParams, useNavigate, useLocation } from 'react-router-dom';
import TrailerView from '../components/TrailerDataView/TrailerView';
import useTrailer from '../hooks/useTrailer';

const TrailerPage = () => {
  const { id } = useParams(); // Get trailerId from URL
  const { trailer, loading, error } = useTrailer(id);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle back navigation
  const handleBackClick = () => {
    const fromPage = location.state?.fromPage || 1; // Get the page we came from, default to page 1
    navigate(`/?page=${fromPage}`);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {trailer ? (
        <>
          <h1>Hit Play and Enjoy!</h1>
          <TrailerView trailer={trailer} />
          <button onClick={handleBackClick}>Back to Trailers</button> {/* Back button */}
        </>
      ) : loading ? (
        <p>Loading Trailer...</p>
      ) : (
        <p>No trailer found</p>
      )}
    </div>
  );
};

export default TrailerPage;