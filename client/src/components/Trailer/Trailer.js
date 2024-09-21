import React from 'react';
import ReactPlayer from 'react-player'; 

const Trailer = ({ trailer }) => {
  return (
    <div style={trailerBoxStyle}>
      <h2>{trailer.trailerName}</h2>
      <p><strong>Genres:</strong> {trailer.genres.join(', ')}</p>
      <p><strong>Min Age Limit:</strong> {trailer.minAgeLimit}</p>
      <p><strong>Release Year:</strong> {trailer.releaseYear}</p>
      <p><strong>Cast:</strong> {trailer.cast.join(', ')}</p>
      <a href={trailer.link} target="_blank" rel="noopener noreferrer">Watch Trailer</a>
      
      
      {/* Render the trailer video using ReactPlayer */}
      {/* {trailer.link && (
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
      )} */}


      <p><em>Uploaded by {trailer.userName}</em></p>
    </div>
  );
};

const trailerBoxStyle = {
  border: '1px solid #ccc',
  padding: '20px',
  margin: '10px',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

export default Trailer;