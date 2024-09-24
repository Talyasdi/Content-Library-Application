import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TrailerView.module.css';

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

        <ul className={styles.genresList}>
          {trailer.genres.map((genre, index) => (
            <li key={index} className={styles.genreItem}>{genre}</li>
          ))}
        </ul>
        <p className={styles.trailerUserName}>Uploaded By {trailer.userName}</p>
      </div>
    </Link>
  );
};

export default Trailer;