// FriendsModal.js
import React from 'react';
import './css/FriendsModal.css'; 

const FriendsModal = ({ isOpen, closeModal, children }) => {
  const modalStyle = {
    display: isOpen ? 'block' : 'none',
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default FriendsModal;
