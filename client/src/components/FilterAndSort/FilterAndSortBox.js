import React, { useState, useEffect } from 'react';
import useTrailers from '../../hooks/useTrailers';
import LibraryView from '../../pages/LibraryViewPage/LibraryViewPage';
import api from '../../services/api';
import { useAuthContext } from '../../hooks/useAuthContext';
import './FilterAndSortBox.css';

const FilterSortBox = () => {
  // Temporary filters for the modal (these change without triggering the API call)
  const [tempFilters, setTempFilters] = useState({
    genres: [],
    minAgeLimit: '',
    releaseYear: ''
  });

  // Actual filters that are applied when user clicks "Filter"
  const [filters, setFilters] = useState({
    genres: [],
    minAgeLimit: '',
    releaseYear: ''
  });

  const [sortBy, setSortBy] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableGenres, setAvailableGenres] = useState([]);
  const { user } = useAuthContext();

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
  }, [user]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Update temp filters when user interacts with the modal
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

  const handleFilter = async () => {
    // CHECK IF USER IS NULL OR TOKEN IS MISSING
    if (!user || !user.token) {
      console.error('User not authenticated');
      return; // EXIT IF USER IS NOT AUTHENTICATED
    }
    
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

  // Generate filter string based on applied filters (not tempFilters)
  const generateFilterString = () => {
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
    return queryParams.toString();
  };

  const filterString = generateFilterString();
  const { trailers, setTrailers, loading, error, pagination, notFound } = useTrailers(filterString);

  // Handle the "Filter" button click
  const applyFilters = () => {
    // Apply the tempFilters as actual filters
    setFilters(tempFilters);
    toggleModal(); // Close the modal after applying the filters
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

  return (
    <div>
      <button onClick={toggleModal}>Filter Trailers</button>

      <select id="sortSelect" value={sortBy} onChange={handleSortChange}>
        <option value="">Select Sorting Option</option>
        <option value="releaseYear">Sort by Release Year</option>
        <option value="minAgeLimit">Sort by Age Limit</option>
        <option value="name">Sort A-Z by Trailer Name</option>
      </select>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Filter Trailers</h2>
            <div>
              <h3>Genres:</h3>
              <div className="genres-list">
                {availableGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleGenreClick(genre)}
                    className={tempFilters.genres.includes(genre) ? 'selected' : ''}
                  >
                    {genre}
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

            <button onClick={applyFilters}>Filter</button>
            <button onClick={toggleModal}>Close</button>

          </div>
        </div>
      )}

      <LibraryView trailers={sortedTrailers} loading={loading} error={error} notFound={notFound} pagination={pagination} />
    </div>
  );
};

export default FilterSortBox;
