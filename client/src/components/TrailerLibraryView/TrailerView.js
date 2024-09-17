import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TrailerView.module.css';

// trailer card in library view
const Trailer = ({ trailer }) => {
  return (
     <Link to={`/trailers/${trailer.trailerName}`} className={styles.trailerLink}>
      <div className={styles.trailerCard} key={trailer._id}>
      <img src="/project-logo.png" alt="Logo" className={styles.appLogo} />
        <h2 className={styles.trailerName}>{trailer.trailerName}</h2>

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



   











