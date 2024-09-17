import React, { useState } from 'react';
import api from '../../services/api';
import Trailer from '../Trailer/Trailer';

const FilterBox = () => {
  const [filters, setFilters] = useState({
    genres: '',
    minAgeLimit: '',
    releaseYear: ''
  });

  const [trailers, setTrailers] = useState([]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Handle form submission for filtering
  const handleFilter = async () => {
    try {
      // Construct the query string with only non-empty values
      const queryParams = new URLSearchParams();
      for (const [key, value] of Object.entries(filters)) {
        if (value) queryParams.append(key, value);
      }
      const queryString = queryParams.toString();
      console.log(queryString);

      const response = await api.get(`/trailer/trailers/filter?${queryString}`);
      setTrailers(response.data);
    } catch (error) {
      console.error('Error fetching trailers:', error);
    }
  };

  return (
    <div>
      {/* Filter form */}
      <div>
        <label>
          Genres:
          <input
            type="text"
            name="genres"
            value={filters.genres}
            onChange={handleInputChange}
            placeholder="Enter genres (comma separated)"
          />
        </label>

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

        <button onClick={handleFilter}>Filter</button>
      </div>

      {/* Display filtered trailers */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {trailers.map((trailer) => (
          <Trailer key={trailer._id} trailer={trailer} />
        ))}
      </div>
    </div>
  );
};

export default FilterBox;
