import React, { useState } from 'react';
import api from '../services/api';
import TrailerForm from './TrailerForm'; 
import { useAuthContext } from "../hooks/useAuthContext";

const UploadTrailer = () => {

  const [trailerName, setTrailerName] = useState('');
  const [trailerStatus, setTrailerStatus] = useState('');
  const [isTrailerAvailable, setIsTrailerAvailable] = useState(false); 
  const { user } = useAuthContext();


  // Function to check if the trailer name exists
  const checkTrailerName = async (name) => {
    try {
      const response = await api.post(
        'http://localhost:5000/api/trailer/check-trailer',
        { trailerName: name.toLowerCase() }, 
        { 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}` 
          }
        }
      );

      const result = response.data; // Directly access the data

      if (result.exists) {
        // THIS CHANGE: MESSAGE DESIGN FOR TRAILER ALREADY EXISTS
        setTrailerStatus(<div className="error">We're sorry, this trailer already exists in our system, so you can't upload it😬</div>);
        setIsTrailerAvailable(false);
      } else {
        // THIS CHANGE: MESSAGE DESIGN FOR TRAILER NOT EXISTING
        setTrailerStatus(<div className="success">This trailer does not exist in our database, we will be happy if you add it now, thanks!🙏🏻</div>);
        setIsTrailerAvailable(true);
      }
    } catch (error) {
      console.error('Error checking trailer name:', error);
      setTrailerStatus('Error checking trailer name');
      setIsTrailerAvailable(false);
    }
  };


  // Handle input change
  const handleInputChange = (event) => {
    setTrailerName(event.target.value); 
    setTrailerStatus(''); 
  };

  // Handle trailer name check on button click
  const handleCheckClick = () => {

    if (trailerName.trim()) {
      checkTrailerName(trailerName);
    } else {
      setTrailerStatus(<div className="error">Please enter a trailer name</div>);
      setIsTrailerAvailable(false);
    }
  };

  // Function to upload the trailer
   const uploadTrailer = async (trailerData) => {
     try {
       const response = await api.post(
         'http://localhost:5000/api/trailer', // Make sure this matches your backend route
         trailerData,
         {
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${user.token}`, // Include the token for authorization
            },
          }
        );
    
        const data = response.data;
        if (response.status === 200) {
          setTrailerStatus(<div className="success">Trailer uploaded successfully!</div>); // SUCCESS MESSAGE
          // Optionally reset the form or handle success feedback
        }
      } catch (error) {
        console.error('Error uploading trailer:', error);
        setTrailerStatus('Error uploading trailer');
      }
    };


  return (
    <div>
      <h2 className="centered-header">Upload Trailer</h2>
      <input
        type="text"
        value={trailerName}
        onChange={handleInputChange}
        placeholder="Enter trailer name"
      />
      <div className="center-button-container">
        <button type="button" className="check-trailer-button" onClick={handleCheckClick}>Check Trailer Name</button>
      </div>
      <p>{trailerStatus}</p>
      
      {/* Show Trailer Form only if the trailer is available */}
      {isTrailerAvailable && <TrailerForm />}
    </div>
  );
};

export default UploadTrailer;




