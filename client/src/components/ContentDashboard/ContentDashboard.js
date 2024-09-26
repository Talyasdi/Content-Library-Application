import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import EditTrailerForm from './EditTrailerForm';
import './ContentDashboard.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import PopupMessage from './PopupMessage';
import popcorn from '../../assets/popcorn.png'
import { Link } from 'react-router-dom';


const UserContentDashboard = () => {
  const [trailers, setTrailers] = useState([]);
  const [error, setError] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const trailersPerPage = 3;
  const [isEditing, setIsEditing] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [trailerToDelete, setTrailerToDelete] = useState(null);
  const { user } = useAuthContext();
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const fetchTrailers = useCallback(async () => {
    if (!user) return;
    try {
      const response = await axios.get(`http://localhost:5000/api/trailer/email`, {
        params: {
          email: user.email,
          _page: activePage,
          _limit: trailersPerPage,
        },
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      setTrailers(response.data);
      const totalCount = parseInt(response.headers['x-total-count']);
      const totalPagesCount = Math.ceil(totalCount / trailersPerPage);
      setTotalPages(totalPagesCount);
    } catch (err) {
      setError('Error fetching trailers');
    }
  }, [activePage, user]);

  useEffect(() => {
    fetchTrailers();
  }, [fetchTrailers]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const confirmDelete = (id) => {
    setTrailerToDelete(id);
    setShowConfirmation(true);
  };

  const deleteTrailer = async () => {
    if (trailerToDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/trailer/${trailerToDelete}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setShowConfirmation(false);
        setTrailerToDelete(null);
        setTrailers(trailers.filter((trailer) => trailer._id !== trailerToDelete));
        showPopupMessage('Trailer deleted successfully');
      }
     catch (err) {
      alert('Failed to delete trailer. Please try again.');
      setShowConfirmation(false);
      setTrailerToDelete(null);
    }
  }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setTrailerToDelete(null);
  };

  const handleEdit = (trailer) => {
    setIsEditing(trailer._id);
  };

  const handleUpdate = () => {
    setIsEditing(false);
    fetchTrailers();
  };

  const ConfirmationDialog = () => (
    <div className="overlay">
    <div className="confirmation-dialog">
      <p>Are you sure you want to delete?</p>
      <button onClick={deleteTrailer}>Yes</button>
      <button onClick={cancelDelete}>No</button>
    </div>
    </div>
  );

  const showPopupMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
  };
  
  const hidePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <h1  style={{ fontSize: '2.5rem' }}><center>
      <img src={popcorn} style={{ width: '48px', height: '48px', marginRight: '20px' }} />
        My Trailers
        <img src={popcorn} style={{ width: '48px', height: '48px', marginLeft: '20px'}} />
        </center></h1>
        <button className="upload-button">
        <Link to="/upload-trailer" style={{ textDecoration: 'none', color: 'white' }}>
          <i className="fa-solid fa-plus" style={{ fontSize: '24px' }}></i>
          Add New Trailer
        </Link>
      </button>
      {error && <p>{error}</p>}
      {trailers.length > 0 ? (
        <>
        <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center', margin: '0 auto', 
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center'
        }}>
          {trailers.map((trailer) => (
            <li key={trailer._id}>
              {isEditing === trailer._id ? (
                <EditTrailerForm
                  trailer={trailer}
                  onClose={() => setIsEditing(null)}
                  onUpdate={handleUpdate}
                  showPopupMessage={showPopupMessage}
                />
              ) : (
                <>
              <div className="trailer-Box">
                <h2>{trailer.trailerName}</h2>
                <p><strong>Genres:</strong> {trailer.genres.join(', ')}</p>
                <p><strong>Min Age Limit:</strong> {trailer.minAgeLimit}</p>
                <p><strong>Release Year:</strong> {trailer.releaseYear}</p>
                <p><strong>Cast:</strong> {trailer.cast.join(', ')}</p>
                <a href={trailer.link} target="_blank" rel="noopener noreferrer">Watch Trailer</a>
                <p></p>
                <button className="icon-button" onClick={() => handleEdit(trailer) } title="Edit Trailer">
                <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button button className="icon-button" onClick={() => confirmDelete(trailer._id) } title="Delete Trailer">
                <i class="fa-regular fa-trash-can"></i>
                </button>
              </div>
              </>
              )}
            </li>
          ))}
        </ul>
        </>
      ) : (
        <p><center>No trailers found for this user.</center></p>
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
      {showConfirmation &&  <ConfirmationDialog />}
      {showPopup && <PopupMessage message={popupMessage} onClose={hidePopup} />}
    </div>
  );
};

export default UserContentDashboard;