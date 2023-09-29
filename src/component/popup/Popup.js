import React from 'react';
import './popup.scss';

const ErrorPopup = ({ message, onClose , status}) => {
  return (
    <div className="error-popup">
      <div className="error-content">
        <p className="error-message">adsfdgsaASDFGGYUHOYITURYSETARWtygfaeddA</p>
        <button className="close-button" onClick={onClose}>
       OK
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;
