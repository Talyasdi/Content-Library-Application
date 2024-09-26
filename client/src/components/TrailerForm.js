import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"; // Import the auth context


const TrailerForm = () => {
  const [ trailerName, setTrailerName] = useState('')
  const [ genres, setGenres] = useState('')
  const [ minAgeLimit, setMinAgeLimit] = useState('')
  const [ releaseYear, setReleaseYear] = useState('')
  const [ cast, setCast] = useState('')
  const [ link, setLink] = useState('')
  const [ userEmail, setUserEmail] = useState('')
  const [ userName, setUserName] = useState('')
  const [ error, setError] = useState(null)
  const { user } = useAuthContext(); // Access user from auth context




  const handelSubmit = async (e) => {
    e.preventDefault()

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
      method : 'POST',
      body: JSON.stringify(trailer),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Include the token in the headers
      }
    });

    const json = await response.json()

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTrailerName('')
      setGenres('')
      setMinAgeLimit('')
      setReleaseYear('')
      setCast('')
      setLink('')
      setError(null)
      console.log('new trailer added',json)
    }
  };

  return (
    <form className = "create" onSubmit={handelSubmit}>
    <h3>Add a New Trailer</h3>

    <label> Trailer Name :</label>
    <input
    type ="text"
    onChange = {(e) => setTrailerName(e.target.value)}
    value={trailerName}
    />

    <label> Trailer Genre\s :</label>
    <input
    type ="text"
    onChange ={(e) => setGenres(e.target.value)}
    value={genres}
    />

    <label> Trailer Minimum Age Limit :</label>
    <input
    type ="number"
    onChange={(e) => setMinAgeLimit(e.target.value)}
    value={minAgeLimit}
    />

    <label> Trailer Release Year:</label>
    <input
    type ="text"
    onChange = {(e) => setReleaseYear(e.target.value)}
    value={releaseYear}
    />

    <label> Trailer Cast:</label>
    <input
    type ="text"
    onChange ={(e) => setCast(e.target.value)}
    value={cast}
    />

    <label> Trailer link (URL) :</label>
    <input
    type ="text"
    onChange={(e) => setLink(e.target.value)}
    value={link}
    />


    <button>Add a New Trailer</button>
    {error && <div className="error">{error}</div>}
    </form>
    );
  };

  export default TrailerForm;