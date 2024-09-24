import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TrailerView.module.css';
import ReactPlayer from 'react-player'; 

// trailer card in library view
const Trailer = ({ trailer, activePage }) => {
  return (
    <Link 
      to={`/trailers/${trailer._id}`} 
      className={styles.trailerLink}
      state={{ fromPage: activePage }} // Pass the current page as state
    >
      <div className={styles.trailerCard} key={trailer._id}>
        <h2 className={styles.trailerName}>{trailer.trailerName}</h2>

      {/* Render the trailer video using ReactPlayer */}
      {trailer.link && (
        <div className={styles.videoContainer}>
          <ReactPlayer 
            url={trailer.link}  // ReactPlayer will handle different platforms
            className={styles.trailerVideo}
            width="100" 
            height="60"
            controls       // Show controls for play, pause, etc.
            playing={false} // Auto-play is off by default
          />
        </div>
      )}
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