import React from 'react';
import ReactPlayer from 'react-player'; 
import styles from '../TrailerLibraryView/TrailerView.module.css'


const Trailer = ({ trailer }) => {

  const getEmbeddableLink = (link) => {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = link.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return link; // return the original link if it's not YouTube
  };


  return (
    <div style={trailerBoxStyle}>
      <h2>{trailer.trailerName}</h2>

      {trailer.link && (
        <div className={styles.videoContainer}>
          <iframe 
            className={styles.trailerVideo}
            width="560" 
            height="315" 
            src={getEmbeddableLink(trailer.link)} 
            title="Trailer video" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      )}
      
      <p><strong>Genres:</strong> {trailer.genres.join(', ')}</p>
      <p><strong>Min Age Limit:</strong> {trailer.minAgeLimit}</p>
      <p><strong>Release Year:</strong> {trailer.releaseYear}</p>
      <p><strong>Cast:</strong> {trailer.cast.join(', ')}</p>
      {/* <a href={trailer.link} target="_blank" rel="noopener noreferrer">Watch Trailer</a> */}


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