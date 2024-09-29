import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"; // Import the auth context
import { useNavigate } from "react-router-dom"; // Import useNavigate

const TrailerForm = () => {
  const [trailerName, setTrailerName] = useState('');
  const [genres, setGenres] = useState('');
  const [minAgeLimit, setMinAgeLimit] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [cast, setCast] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // New state for success message
  const { user } = useAuthContext(); // Access user from auth context
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trailer = {
      trailerName,
      genres,
      minAgeLimit,
      releaseYear,
      cast,
      link,
      userEmail: user.email, // Use user email from auth context
      userName: user.userName // Use user name from auth context
    };

    const response = await fetch('/api/trailer', {
      method: 'POST',
      body: JSON.stringify(trailer),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Include the token in the headers
      }
    });

    const json = await response.json();

    if (!response.ok) {
      // THIS CHANGE: ADDED CONDITIONAL ERROR MESSAGE FOR ALREADY EXISTING TRAILER
      if (json.error.includes('already exists')) {
        setError(`We're sorry, this trailer already exists in our system, so you can't upload it 😬`);
      } else {
        // THIS CHANGE: ADDED CONDITIONAL ERROR MESSAGE FOR TRAILER NOT EXISTING
        setError(`This trailer does not exist in our database, we will be happy if you add it now, thanks! 🙏🏻`);
      }
      setSuccessMessage(null); // Clear success message on error
    }

    if (response.ok) {
      setTrailerName('');
      setGenres('');
      setMinAgeLimit('');
      setReleaseYear('');
      setCast('');
      setLink('');
      setError(null);
      //setSuccessMessage(`Wonderful! Your trailer "${json.trailerName}" has been added to our database, thank you! Now you can see it in the Home Page 🥳`); // Set success message
      setSuccessMessage(
        <>
          Wonderful! Your trailer "{json.trailerName}" has been added to our database, thank you!
          <br />
          Now you can see it in the Home Page 🥳
        </>
      );
      console.log('New trailer added', json);
    }
  };

  const handleNavigateHome = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <form className="new-trailer-form" onSubmit={handleSubmit}>
      <h3 className="centered-header">Add a New Trailer</h3>

      <label>Trailer Name:</label>
      <input
        type="text"
        onChange={(e) => setTrailerName(e.target.value)}
        value={trailerName}
      />

      <label>Trailer Genres:</label>
      <input
        type="text"
        onChange={(e) => setGenres(e.target.value)}
        value={genres}
      />

      <label>Trailer Minimum Age Limit:</label>
      <input
        type="number"
        onChange={(e) => setMinAgeLimit(e.target.value)}
        value={minAgeLimit}
      />

      <label>Trailer Release Year:</label>
      <input
        type="text"
        onChange={(e) => setReleaseYear(e.target.value)}
        value={releaseYear}
      />

      <label>Trailer Cast:</label>
      <input
        type="text"
        onChange={(e) => setCast(e.target.value)}
        value={cast}
      />

      <label>Trailer Link (URL):</label>
      <input
        type="text"
        onChange={(e) => setLink(e.target.value)}
        value={link}
      />

      <button type="submit" className="upload-trailer-button">
        Upload The New Trailer
      </button>
      <button type="button" className="upload-trailer-button" onClick={handleNavigateHome}>
        Back to HomePage
      </button> 

      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>} {/* Display success message */}
    </form>
  );
};

export default TrailerForm;


