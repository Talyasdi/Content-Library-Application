import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';

const EditTrailerForm = ({ trailer, onClose, onUpdate, showPopupMessage }) => {
  const [formData, setFormData] = useState({
    trailerName: trailer.trailerName,
    genres: trailer.genres.join(', '), 
    cast: trailer.cast.join(', '), 
    releaseYear: trailer.releaseYear,
    link: trailer.link,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/trailer/${trailer._id}`, {
        ...formData,
        genres: formData.genres.split(',').map((genre) => genre.trim()), 
        cast: formData.cast.split(',').map((actor) => actor.trim()), 
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        }});
      onUpdate(); 
      onClose(); 
      showPopupMessage('Trailer updated successfully');
    } catch (err) {
      console.error('Error updating trailer', err);
    }
  };

  return (
      <div className="overlay">
      <form className="editTrailer" onSubmit={handleSubmit} >
        <label>
          Trailer Name:
          <input
            type="text"
            name="trailerName"
            value={formData.trailerName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Genres (comma-separated):
          <input
            type="text"
            name="genres"
            value={formData.genres}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Cast (comma-separated):
          <input
            type="text"
            name="cast"
            value={formData.cast}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Release Year:
          <input
            type="number"
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Trailer Link:
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Update Trailer</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditTrailerForm;