import React from 'react';
import styles from './ItemView.module.css'; 

//each trailer all details
const ItemView = ({ item }) =>{
  return (
    //TODO <div key={trailer._id}> is needed?
    <div className={styles.trailerCard}>
      {/* {item.imageUrl && <img src={item.imageUrl} alt={item.trailerName} className={styles.img} />} */}
      <img src="/project-logo.png" alt="Logo" className={styles.appLogo} />
      <h2 className= {styles.trailerName}>{item.trailerName}</h2>

      <h3 className={styles.releaseYear}>Release Year: {item.releaseYear}</h3>

      {/* Render genres as a list */}
      <b className={styles.genresLabel}>Genres:</b>
      <ul className={styles.genresList}>
        {item.genres && item.genres.map((genre, index) => (
          <li key={index} className={styles.genreItem}>{genre}</li>
        ))}
      </ul>

      {/* Render cast as a list */}
      <b className={styles.castLabel}>Cast:</b>
      <ul className={styles.castList}>
        {item.cast && item.cast.map((member, index) => (
          <li key={index} className={styles.castItem}>{member}</li>
        ))}
      </ul>
      <p className={styles.minAge}><b>Minimum age limit:</b> {item.minAgeLimit}</p>
      <a href={item.link} className={styles.trailerLink}>Watch Trailer</a>
      
    </div>
  );
}

export default ItemView;

