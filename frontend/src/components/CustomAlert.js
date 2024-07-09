import React from 'react';
import './css/CustomAlert.css';

const CustomAlert = ({ visible, message }) => {
  if (!visible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="spinner"></div>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default CustomAlert;
