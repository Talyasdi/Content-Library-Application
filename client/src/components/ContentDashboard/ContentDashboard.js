import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import EditTrailerForm from './EditTrailerForm';
import './ContentDashboard.css';
import Trailer from '../../components/TrailerLibraryView/TrailerView';
import {useAuthContext} from '../../hooks/useAuthContext'

const UserContentDashboard = () => {
  const [trailers, setTrailers] = useState([]);
  const [error, setError] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const trailersPerPage = 2;
  const [isEditing, setIsEditing] = useState(null);


  const user = useAuthContext();
  // Temporarily hardcoding the user's email
  // const userEmail = 'userName1@example.com';

  const fetchTrailers = useCallback(async () => {
    if (!user) return;  // Skip fetching if email isn't available

    try {
      // const response = await axios.get(`http://localhost:5000/api/trailer/email?email=${userEmail}`, {
        const response = await axios.get(`http://localhost:5000/api/trailer/email`, {  
      headers : {
          Authorization: `Bearer ${user.token}`
        },
        params: {
          // email: userEmail,
          email: user.email,
          _page: activePage,
          _limit: trailersPerPage,
        },
      });

      setTrailers(response.data);
      const totalCount = parseInt(response.headers['x-total-count']);
      const totalPagesCount = Math.ceil(totalCount / trailersPerPage);
      setTotalPages(totalPagesCount);
    } catch (err) {
      setError('Error fetching trailers');
    }
  }, [activePage, trailersPerPage,  user]);

  useEffect(() => {
    fetchTrailers();
  }, [fetchTrailers]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const deleteTrailer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/trailer/${id}`);
      setTrailers(trailers.filter((trailer) => trailer._id !== id));
    } catch (err) {
      setError('Error deleting trailer');
    }
  };

  const handleEdit = (trailer) => {
    setIsEditing(trailer._id);
  };

  const handleUpdate = () => {
    setIsEditing(false);
    fetchTrailers();
  };

  return (
    <div>
      <h1><center>My Trailers</center></h1>
      {error && <p>{error}</p>}
      {trailers.length > 0 ? (
        <>
        <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center', margin: '0 auto' }}>
          {trailers.map((trailer) => (
            <li key={trailer._id}>
              {isEditing === trailer._id ? (
                <EditTrailerForm
                  trailer={trailer}
                  onClose={() => setIsEditing(null)}
                  onUpdate={handleUpdate}
                />
              ) : (
                <div className='Container'>
                  <Trailer trailer={trailer} />
              {/* <h3>{trailer.trailerName}</h3>
              <p>Genres: {trailer.genres.join(', ')}</p>
              <p>Cast: {trailer.cast.join(', ')}</p>
              <p>Release Year: {trailer.releaseYear}</p>
              <a href={trailer.link} target="_blank" rel="noopener noreferrer">Watch Trailer</a> */}
              
              <div>
                <button onClick={() => handleEdit(trailer)}>Edit</button>
                <button onClick={() => deleteTrailer(trailer._id)}>Delete</button>
              </div>
              </div>
              )}
            </li>
          ))}
        </ul>
            </>
      ) : (
        <p>No trailers found for this user.</p>
      )}
        <div className="pagination">
          <Pagination
            pagination={{
              currPage: activePage,
              totalPages: totalPages,
              handlePageChange: handlePageChange
            }}
          />
        </div>
    </div>
  );
};

export default UserContentDashboard;