import React from 'react';
import { createPortal } from 'react-dom';

const GlobalSpinner = ({ isVisible = false, message = 'Loading...' }) => {
  if (!isVisible) return null;

  return createPortal(
    <div className="global-spinner">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="spinner w-10 h-10"></div>
        {message && (
          <p className="text-sm text-text-secondary font-medium">{message}</p>
        )}
      </div>
    </div>,
    document.body
  );
};

export default GlobalSpinner;