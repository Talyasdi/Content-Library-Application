import ReactPlayer from 'react-player'; 
import styles from './TrailerView.module.css'; 

const TrailerView = ({ trailer }) => {
  return (
    <div className={styles.trailerCard}>
      {/* Render the trailer video using ReactPlayer */}
      {trailer.link && (
        <div className={styles.videoContainer}>
          <ReactPlayer 
            url={trailer.link}  // ReactPlayer will handle different platforms
            className={styles.trailerVideo}
            width="560" 
            height="315"
            controls       // Show controls for play, pause, etc.
            playing={false} // Auto-play is off by default
          />
        </div>
      )}

  <div className={styles.dataContainer}>

    <h2 className={styles.trailerName}>{trailer.trailerName}</h2>

    <p><b>Release Year: </b> {trailer.releaseYear}</p>

    <p><b>Min Age Limit:</b> {trailer.minAgeLimit}</p>

    <p><b>Genres:</b>
      <ul className={styles.genresList}>
        {trailer.genres && trailer.genres.map((genre, index) => (
          <li key={index} className={styles.genreItem}>{genre}</li>
        ))}
      </ul>
      </p>

    <p><b>Cast:</b>
      <ul className={styles.castList}>
        {trailer.cast && trailer.cast.map((member, index) => (
          <li key={index} className={styles.castItem}>{member}</li>
        ))}
      </ul>
      </p>
    </div>
    </div>
  );
}

export default TrailerView;

