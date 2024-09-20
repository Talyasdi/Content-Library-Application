import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Trailer from '../Trailer/Trailer';
import { useAuthContext } from '../../hooks/useAuthContext';
import './FilterBox.css'; 

const FilterBox = () => {
  const [filters, setFilters] = useState({
    genres: [],
    minAgeLimit: '',
    releaseYear: ''
  });
  
  const [sortBy, setSortBy] = useState(''); // State for sorting criteria
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSortingModalOpen, setIsSortingModalOpen] = useState(false); // State for sorting modal
  const [availableGenres, setAvailableGenres] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchGenres = async () => {
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleSortingModal = () => {
    setIsSortingModalOpen(!isSortingModalOpen);
  };

  const handleGenreClick = (genre) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      genres: prevFilters.genres.includes(genre)
        ? prevFilters.genres.filter((g) => g !== genre)
        : [...prevFilters.genres, genre]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleFilter = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.genres.length > 0) {
        queryParams.append('genres', filters.genres.join(','));
      }
      if (filters.minAgeLimit) {
        queryParams.append('minAgeLimit', filters.minAgeLimit);
      }
      if (filters.releaseYear) {
        queryParams.append('releaseYear', filters.releaseYear);
      }

      const queryString = queryParams.toString();
      const response = await api.get(`/trailer/trailers/filter?${queryString}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setTrailers(response.data);
      toggleModal();
    } catch (error) {
      console.error('Error fetching trailers:', error);
    }
  };

  // Handle sorting logic
  const handleSort = (criteria) => {
    setSortBy(criteria);
    setIsSortingModalOpen(false); // Close the sorting modal
  };

  // Sorting function
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

  // Display sorted trailers (apply sorting here)
  const sortedTrailers = sortTrailers(trailers);

  return (
    <div>
      {/* Button to open the filter modal */}
      <button onClick={toggleModal}>Filter Trailers</button>
      
      {/* Button to open the sorting modal */}
      <button onClick={toggleSortingModal}>Sort Trailers</button>

      {/* Modal for filtering */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Filter Trailers</h2>
            {/* Genre selection */}
            <div>
              <h3>Genres:</h3>
              <div className="genres-list">
                {availableGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleGenreClick(genre)}
                    className={filters.genres.includes(genre) ? 'selected' : ''}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Min Age Limit */}
            <label>
              Minimum Age Limit:
              <input
                type="number"
                name="minAgeLimit"
                value={filters.minAgeLimit}
                onChange={handleInputChange}
                placeholder="Enter minimum age limit"
              />
            </label>

            {/* Release Year */}
            <label>
              Release Year:
              <input
                type="number"
                name="releaseYear"
                value={filters.releaseYear}
                onChange={handleInputChange}
                placeholder="Enter release year"
              />
            </label>

            {/* Filter Button */}
            <button onClick={handleFilter}>Apply Filters</button>
            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}

      {/* Modal for sorting */}
      {isSortingModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Sort Trailers</h2>
            <button onClick={() => handleSort('releaseYear')}>Sort by Release Year</button>
            <button onClick={() => handleSort('minAgeLimit')}>Sort by Minimum Age Limit</button>
            <button onClick={() => handleSort('name')}>Sort A-Z by Trailer Name</button>
            <button onClick={toggleSortingModal}>Close</button>
          </div>
        </div>
      )}

      {/* Display sorted trailers */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {sortedTrailers.map((trailer) => (
          <Trailer key={trailer._id} trailer={trailer} />
        ))}
      </div>
    </div>
  );
};

export default FilterBox;
