import ReactPlayer from 'react-player'; 
import styles from '../TrailerDataView/TrailerView.module.css'; 
import './ContentDashboard.css'

const TrailerDashboardView = ({ trailer, handleEdit, confirmDelete }) => {
    return (
      <div className="trailerDashCard">
        {trailer.link && (
          <div className="videoDashContainer">
            <ReactPlayer
              url={trailer.link}
              className={styles.trailerVideo}
              width="560"
              height="315"
              controls
              playing={false}
            />
          </div>
        )}
  
        <div className={"dataDashContainer"}>
          <h2 className={styles.trailerName}>{trailer.trailerName}</h2>
          <p><b>Release Year: </b> {trailer.releaseYear}</p>
          <p><b>Min Age Limit:</b> {trailer.minAgeLimit}</p>

          <div>
            <b>Genres:</b>
            <ul className={styles.genresList}>
              {trailer.genres && trailer.genres.map((genre, index) => (
                <li key={index} className={styles.genreItem}>{genre}</li>
              ))}
            </ul>
          </div>
  
          <div>
            <b>Cast:</b>
            <ul className={styles.castList}>
              {trailer.cast && trailer.cast.map((member, index) => (
                <li key={index} className={styles.castItem}>{member}</li>
              ))}
            </ul>
          </div>
        </div>
  
        <div className="buttonContainer">
            <button className="icon-button" onClick={() => handleEdit(trailer)} title="Edit Trailer">
                <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button className="icon-button" onClick={() => confirmDelete(trailer._id)} title="Delete Trailer">
                <i className="fa-regular fa-trash-can"></i>
            </button>
        </div>
      </div>
    );
  };

export default TrailerDashboardView;