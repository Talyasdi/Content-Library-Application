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
      setError(json.error);
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
      setSuccessMessage(`Wonderful! Your trailer "${json.trailerName}" has been added to our database, thank you! You can see it on your Home Page :)`); // Set success message
      console.log('New trailer added', json);
    }
  };

  const handleNavigateHome = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Trailer</h3>

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

      <button type="submit">Add a New Trailer</button>
      <button type="button" onClick={handleNavigateHome}>Back to HomePage</button> {/* New button to navigate back to home */}

      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>} {/* Display success message */}
    </form>
  );
};

export default TrailerForm;
