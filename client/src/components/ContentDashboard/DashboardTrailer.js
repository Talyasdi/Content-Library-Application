import React from 'react';

const Trailer = ({ trailer }) => {
  return (
    <div style={trailerBoxStyle}>
      <h2>{trailer.trailerName}</h2>
      <p><strong>Genres:</strong> {trailer.genres.join(', ')}</p>
      <p><strong>Min Age Limit:</strong> {trailer.minAgeLimit}</p>
      <p><strong>Release Year:</strong> {trailer.releaseYear}</p>
      <p><strong>Cast:</strong> {trailer.cast.join(', ')}</p>
      <a href={trailer.link} target="_blank" rel="noopener noreferrer">Watch Trailer</a>
    </div>
  );
};

const trailerBoxStyle = {
  border: '1px solid #ccc',
  padding: '20px',
  margin: '10px',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  flex: '1 1 30%', // Adjust the percentage as needed
  maxWidth: '500px', // Set a maximum width for each box
};

export default Trailer;