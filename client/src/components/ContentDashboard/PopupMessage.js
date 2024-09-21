import React from 'react';

const PopupMessage = ({ message, onClose }) => {
  return (
    <div className="overlay">
    <div className="confirmation-dialog">
      <div className="confirmation-content">
        <p>
        <i class="fa-regular fa-circle-check" style={{ fontSize: '34px' }}></i>
        </p>
        <p>{message}
        </p>
        <button onClick={onClose} className="confirmation-button">Close</button>
      </div>
    </div>
    </div>
  );
};

export default PopupMessage;