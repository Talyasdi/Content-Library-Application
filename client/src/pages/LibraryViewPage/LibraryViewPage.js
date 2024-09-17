import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrailersContext } from '../../context/TrailersContext';
import styles from './LibraryView.module.css';
import FirstButton from '../../components/common/FirstButton/FirstButton';
import Trailer from '../../components/TrailerLibraryView/TrailerView';
import ItemView from '../TrailerPage/TrailerPage';

const LibraryView = () => {
  const { trailers, getAllTrailers } = useContext(TrailersContext);
  // Local state to track if trailers should be shown
  const [showTrailers, setShowTrailers] = useState(true);

  // // Function to handle button click
  //  const handleShowTrailers = async () => {
  //   await getAllTrailers();  // Fetch trailers from the backend
  //   setShowTrailers(true);   // Set state to true to show the trailers
  // };

  // Log trailers and showTrailers to help with debugging
  console.log('Trailers:', trailers);
  console.log('Show Trailers:', showTrailers);

  return (
    <div className={styles.trailersContainer}>
    {/* <Link to={`/trailers/`} className={styles.trailerLink}> */}
    
    
      {/* Button to trigger fetching and showing trailers */}
      {/* <FirstButton onClick={handleShowTrailers}>Show All Trailers</FirstButton> */}
      {trailers && trailers.length > 0 ? (
          <div className={styles.trailerList}>
            {trailers.map((trailer) => (
              <Trailer trailer={trailer} />
            ))}
          </div>
        ) : (
          // <div>No trailers found</div>
          <div>Loading...</div>
        )}
      {/* Conditionally render trailers after button click */}
      {/* {showTrailers ? (
        trailers && trailers.length > 0 ? (
          <div className={styles.trailerList}> */}
            {/* {trailersIst.map((trailer) => ( */}
            {/* {trailers.map((trailer) => (
              // <Trailer key={trailer._id} trailer={trailer} />
              <Trailer trailer={trailer} />
            ))}
          </div>
        ) : (
          <div>No trailers found</div>
        )
      ) : null}  */}
      {/* If showTrailers is false, nothing is rendered */}
      {/* </Link> */}
    </div>
  );
};

export default LibraryView;