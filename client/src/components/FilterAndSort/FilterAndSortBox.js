import React, { useState, useEffect } from 'react';
import useTrailers from '../../hooks/useTrailers';
import LibraryView from '../../pages/LibraryViewPage/LibraryViewPage';
import api from '../../services/api';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './FilterAndSortBox.css';

const FilterSortBox = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();

  const [filters, setFilters] = useState({
    genres: [],
    minAgeLimit: '',
    releaseYear: ''
  });
  const [tempFilters, setTempFilters] = useState(filters); // Temporary state for modal
  const [availableGenres, setAvailableGenres] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      if (!user?.token) {
        console.error('User not authenticated');
        return;
      }

      try {
        const response = await api.get('/trailer/genres', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setAvailableGenres(response.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, [user]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = {
      genres: params.get('genres') ? params.get('genres').split(',') : [],
      minAgeLimit: params.get('minAgeLimit') || '',
      releaseYear: params.get('releaseYear') || ''
    };
    setFilters(newFilters);
    setTempFilters(newFilters);
  }, [location.search]);

  const generateFilterString = () => {
    const queryParams = new URLSearchParams();
    if (filters.genres.length) queryParams.append('genres', filters.genres.join(','));
    if (filters.minAgeLimit) queryParams.append('minAgeLimit', filters.minAgeLimit);
    if (filters.releaseYear) queryParams.append('releaseYear', filters.releaseYear);
    return queryParams.toString();
  };

  const applyFilters = () => {
    if (tempFilters.minAgeLimit && parseInt(tempFilters.minAgeLimit) > user.age) {
      setValidationMessage(`Minimum age limit cannot exceed your age (${user.age}).`);
      return;
    }

    setFilters(tempFilters);
    const filterQueryString = generateFilterString();
    navigate(`/?page=1&${filterQueryString}`);
    setIsModalOpen(false);
  };

  const clearFilters = () => {
    setTempFilters({ genres: [], minAgeLimit: '', releaseYear: '' });
    navigate(`/?page=1`);
    setIsModalOpen(false);
  };

  const handleMinAgeLimitChange = (e) => {
    const newAgeLimit = e.target.value;
    setTempFilters((prev) => ({ ...prev, minAgeLimit: newAgeLimit }));

    // Reset validation message if the new age limit is valid
    if (newAgeLimit && parseInt(newAgeLimit) <= user.age) {
      setValidationMessage('');
    }
  };

  const sortTrailers = (trailers) => {
    switch (sortBy) {
      case 'releaseYear':
        return [...trailers].sort((a, b) => b.releaseYear - a.releaseYear);
      case 'minAgeLimit':
        return [...trailers].sort((a, b) => a.minAgeLimit - b.minAgeLimit);
      case 'name':
        return [...trailers].sort((a, b) => a.trailerName.localeCompare(b.trailerName));
      default:
        return trailers;
    }
  };

  const { trailers, loading, error, pagination } = useTrailers(generateFilterString());

  return (
    <div>
      <div className="FilterSortBoxes">
        <button onClick={() => setIsModalOpen(true)}>Filter Trailers</button>
        <select id="sortSelect" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
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
                    key={genre}
                    onClick={() =>
                      setTempFilters((prev) => ({
                        ...prev,
                        genres: prev.genres.includes(genre)
                          ? prev.genres.filter((g) => g !== genre)
                          : [...prev.genres, genre]
                      }))
                    }
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
                  value={tempFilters.minAgeLimit}
                  onChange={handleMinAgeLimitChange}
                  placeholder="Enter age limit"
                />
              </div>
              <div className="filter-item">
                <h3>Release Year:</h3>
                <input
                  type="number"
                  value={tempFilters.releaseYear}
                  onChange={(e) => setTempFilters({ ...tempFilters, releaseYear: e.target.value })}
                  placeholder="Enter release year"
                />
              </div>
            </div>

            {validationMessage && <p className="error-message">{validationMessage}</p>}

            <button onClick={applyFilters}>Apply Filters</button>
            <button onClick={clearFilters}>Clear</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      <LibraryView trailers={sortTrailers(trailers)} loading={loading} error={error} pagination={pagination} />
    </div>
  );
};

export default FilterSortBox;

