import React, { useState } from 'react';
const AlertCompo = ({ message }) => {
  const [show, setShow] = useState(true);
  if (!show) {
    return null;
  }
  return (
    <div
      style={{
        backgroundColor: '#f2dede',
        border: '1px solid #ebcccc',
        borderRadius: '5px',
        color: '#a94442',
        padding: '15px',
        textAlign: 'center',
        marginTop: '15px',
      }}
    >
      {message}
      <button
        style={{
          backgroundColor: '#a94442',
          border: 'none',
          borderRadius: '5px',
          color: '#fff',
          padding: '5px 10px',
          marginLeft: '15px',
          cursor: 'pointer',
        }}
        onClick={() => setShow(false)}
      >
        Close
      </button>
    </div>
  );
};

export default AlertCompo;