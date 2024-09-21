import { useParams } from 'react-router-dom';
import TrailerView from '../components/TrailerView/TrailerView';
import useTrailer from '../hooks/useTrailer';

const TrailerPage = () => {
  const { id } = useParams(); // Get trailerId from URL
  const { trailer, loading, error} = useTrailer(id);
   return (
    <div>
      {error && <p>{error}</p>}
      { 
        trailer ? (
          <>
          <h1>Hit Play and Enjoy!</h1>
          <TrailerView trailer={trailer} />
          </>
        ) : loading ? (
          <p>Loading Trailer...</p>
        ) : ( 
          <p>No trailer found</p> 
        )
      }
    </div>
   )
};

export default TrailerPage;