import { useParams, useNavigate, useLocation } from 'react-router-dom';
import TrailerView from '../components/TrailerDataView/TrailerView';
import useTrailer from '../hooks/useTrailer';
import { GoArrowLeft } from "react-icons/go";

const TrailerPage = () => {
  const { id } = useParams(); // Get trailerId from URL
  const { trailer, loading, error } = useTrailer(id);
  const navigate = useNavigate();
  const location = useLocation();

  
  // const handleBackClick = () => {
  //   const fromPage = location.state?.fromPage || 1; // Get the page we came from, default to page 1
  //   navigate(`/?page=${fromPage}`);
  // };
  
  // Handle back navigation
  // const handleBackClick = () => {
  //   const fromPage = location.state?.fromPage || 1;  // Retrieve the page
  //   const fromFilters = location.state?.filters || {};  // Retrieve the filters from state
  //   navigate(-1, { state: { filters: fromFilters, fromPage } });  // Navigate back with state
  // };
  const handleBackClick = () => {
    const fromPage = location.state?.fromPage || 1;  // Retrieve the page
    const fromFilters = location.state?.filters || '';  // Retrieve the filters
    navigate(`/?page=${fromPage}&${fromFilters}`);
  };
  
  

  return (
    <div>
      {error && <p>{error}</p>}
      {trailer ? (
        <>
          {/* Back button */}
          <button onClick={handleBackClick} style={{
            display: 'flex',             
            alignItems: 'center',        
            border: 'none',              
            cursor: 'pointer',           
            fontSize: '15px',            
            padding: '15px'              
            }}> 
            <GoArrowLeft />
            Back to Trailers
          </button>

          <h1>Hit Play and Enjoy!</h1>
          
          <TrailerView trailer={trailer} />
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