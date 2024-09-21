import React, { useState } from 'react';

const UploadTrailer = () => {
  const [trailerName, setTrailerName] = useState('');
  const [trailerStatus, setTrailerStatus] = useState('');

  const checkTrailerName = async (name) => {
    try {
      const response = await fetch('http://localhost:3000/check-trailer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trailerName: name }),
      });

      const result = await response.json();

      if (result.exists) {
        setTrailerStatus(result.message); // "Trailer already exists"
      } else {
        setTrailerStatus(result.message); // "Trailer name is available"
      }
    } catch (error) {
      console.error('Error checking trailer name:', error);
    }
  };

  const handleInputChange = (event) => {
    const name = event.target.value;
    setTrailerName(name);
    checkTrailerName(name);
  };

  return (
    <div>
      <h2>Upload Trailer</h2>
      <input
        type="text"
        value={trailerName}
        onChange={handleInputChange}
        placeholder="Enter trailer name"
      />
      <p>{trailerStatus}</p>
      {/* Add other fields and submit button for uploading the trailer */}
    </div>
  );
};

export default UploadTrailer;
