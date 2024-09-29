import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TrailerView.module.css';
import ReactPlayer from 'react-player'; 

// trailer card in library view
const Trailer = ({ trailer, activePage, filters }) => {
  //const {currPage, totalPages} = getPages;
  return (
    <Link 
      to={`/trailers/${trailer._id}`} 
      className={styles.trailerLink}
      state={{ fromPage: activePage, filters: filters }} // Pass the current page and filters via state
    >
      <div className={styles.trailerCard} key={trailer._id}>
              {/* Render the trailer video using ReactPlayer */}
      {trailer.link && (
        <div className={styles.videoContainer}>
          <ReactPlayer 
            url={trailer.link}  // ReactPlayer will handle different platforms
            className={styles.trailerVideo}
            width="260" 
            height="250"
            controls       // Show controls for play, pause, etc.
            playing={false} // Auto-play is off by default
          />
        </div>
      )}
        <p className={styles.trailerName}>{trailer.trailerName}</p>
        <ul className={styles.genresList}>
          {trailer.genres.map((genre, index) => (
            <li key={index} className={styles.genreItem}>{genre}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

export default Trailer;