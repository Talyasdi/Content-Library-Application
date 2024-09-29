import React, { useState, useEffect } from 'react';
import useTrailers from '../../hooks/useTrailers';
import LibraryView from '../../pages/LibraryViewPage/LibraryViewPage';
import api from '../../services/api';
import { useAuthContext } from '../../hooks/useAuthContext';
import './FilterAndSortBox.css';
import { useNavigate, useLocation } from 'react-router-dom';

const FilterSortBox = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tempFilters, setTempFilters] = useState({
    genres: [],
    minAgeLimit: '',
    releaseYear: ''
  });

  const [filters, setFilters] = useState({
    genres: [],
    minAgeLimit: '',
    releaseYear: ''
  });

  const [sortBy, setSortBy] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableGenres, setAvailableGenres] = useState([]);
  const { user } = useAuthContext();
  const [validationMessage, setValidationMessage] = useState(''); // State for validation message
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // State for error modal


   // Effect to set initial filters from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genres = params.get('genres') ? params.get('genres').split(',') : [];
    const minAgeLimit = params.get('minAgeLimit') || '';
    const releaseYear = params.get('releaseYear') || '';

    setFilters({ genres, minAgeLimit, releaseYear });
    setTempFilters({ genres, minAgeLimit, releaseYear }); // Set temp filters for modal pre-fill
  }, [location.search]);

  useEffect(() => {
    const fetchGenres = async () => {
     // CHECK IF USER IS NULL OR TOKEN IS MISSING
     if (!user || !user.token) {
       console.error('User not authenticated');
       return; // EXIT IF USER IS NOT AUTHENTICATED
     }
      

      try {
        const response = await api.get('/trailer/genres', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setAvailableGenres(response.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, [user.token]);


  const showErrorModal = () => {
    setIsErrorModalOpen(true); // Open error modal
  };
  
  const closeErrorModal = () => {
    setIsErrorModalOpen(false); // Close error modal
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setValidationMessage(''); // Clear message when modal is toggled
  };

  const handleGenreClick = (genre) => {
    setTempFilters((prevFilters) => ({
      ...prevFilters,
      genres: prevFilters.genres.includes(genre)
        ? prevFilters.genres.filter((g) => g !== genre)
        : [...prevFilters.genres, genre]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempFilters({
      ...tempFilters,
      [name]: value
    });
  };

  const generateFilterString = () => {
    const queryParams = new URLSearchParams();
    if (filters.genres && filters.genres.length > 0) {
      queryParams.append('genres', filters.genres.join(','));
    }
    if (filters.minAgeLimit) {
      queryParams.append('minAgeLimit', filters.minAgeLimit);
    }
    if (filters.releaseYear) {
      queryParams.append('releaseYear', filters.releaseYear);
    }
    return queryParams.toString();
  };

  const FilterString = generateFilterString();
  const { trailers, loading, error, pagination, notFound } = useTrailers(FilterString);


  function generateFilterString1(tempFilters) {
    const params = new URLSearchParams();
  
    // Loop through the tempFilters object and add each key-value pair to the params
    for (const key in tempFilters) {
      if (tempFilters[key]) {
        params.append(key, tempFilters[key]);
      }
    }
  
    // Return the filter string in a query parameter format
    return params.toString();
  }


  const applyFilters = () => {
    // Check if the minimum age limit exceeds the user's age
if (tempFilters.minAgeLimit && parseInt(tempFilters.minAgeLimit) > user.age) {
  setValidationMessage(`Minimum age limit cannot exceed your age (${user.age}).`);
  return; // Stop applying filters
}

    setFilters(tempFilters);
    // navigate(`/?page=1`);
    const filterQueryString = generateFilterString1(tempFilters); // Updated to use tempFilters
    navigate(`/?page=1&${filterQueryString}`, { state: { filters: filterQueryString } });
    toggleModal(); // Close the modal after applying the filters
  };

  const clearFilters = () => {
    setTempFilters({
      genres: [],
      minAgeLimit: '',
      releaseYear: ''
    });
    setFilters({
      genres: [],
      minAgeLimit: '',
      releaseYear: ''
    });
    navigate(`/?page=1`);
    toggleModal(); // Close the modal after clearing the filters
  };

  const handleSortChange = (e) => {
    const criteria = e.target.value;
    setSortBy(criteria);
  };

  const sortTrailers = (trailersToSort) => {
    if (sortBy === 'releaseYear') {
      return [...trailersToSort].sort((a, b) => b.releaseYear - a.releaseYear);
    } else if (sortBy === 'minAgeLimit') {
      return [...trailersToSort].sort((a, b) => a.minAgeLimit - b.minAgeLimit);
    } else if (sortBy === 'name') {
      return [...trailersToSort].sort((a, b) => a.trailerName.localeCompare(b.trailerName));
    }
    return trailersToSort;
  };

  const sortedTrailers = sortTrailers(trailers);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  

  return (
    <div>
      <div className='FilterSortBoxes'>
        <button onClick={toggleModal}>Filter Trailers</button>
        <select id="sortSelect" value={sortBy} onChange={handleSortChange}>
          <option value="">Select Sorting Option</option>
          <option value="releaseYear">Sort by Release Year</option>
          <option value="minAgeLimit">Sort by Minimum Age Limit</option>
          <option value="name">Sort A-Z by Trailer Name</option>
        </select>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Filter Trailers</h2>
            <div>
              <h3>Genres:</h3>
              <div className="genres-list">
                {availableGenres.map((genre) => (
                  <button
                    key={genre.toLowerCase()}
                    onClick={() => handleGenreClick(genre.toLowerCase())}
                    className={tempFilters.genres.includes(genre.toLowerCase()) ? 'selected' : ''}
                  >
                    {capitalizeFirstLetter(genre)}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-container">
              <div className="filter-item">
                <h3>Age Limit:</h3>
                <input
                  type="number"
                  name="minAgeLimit"
                  value={tempFilters.minAgeLimit}
                  onChange={handleInputChange}
                  placeholder="Enter age limit"
                />
              </div>
              <div className="filter-item">
                <h3>Release Year:</h3>
                <input
                  type="number"
                  name="releaseYear"
                  value={tempFilters.releaseYear}
                  onChange={handleInputChange}
                  placeholder="Enter release year"
                />
              </div>
            </div>

            {validationMessage && <p className="error-message">{validationMessage}</p>} {/* Display error message */}
            {isErrorModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <h2>Error</h2>
      <p>{validationMessage}</p>
      <button onClick={closeErrorModal}>Close</button>
    </div>
  </div>
)}


            <button onClick={applyFilters}>Filter</button>
            <button onClick={clearFilters}>Clear</button> {/* Clear button */}
            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}

      <LibraryView trailers={sortedTrailers} loading={loading} error={error} notFound={notFound} pagination={pagination} />
    </div>
  );
};

export default FilterSortBox;