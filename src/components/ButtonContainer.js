import React from 'react';
import { FaTrash, FaDownload } from 'react-icons/fa';

const ButtonContainer = ({ clearNotes, exportImage }) => (
  <div className="button-container">
    <button onClick={clearNotes} className="icon-button">
      <FaTrash /> <span>Temizle</span>
    </button>
    <button onClick={exportImage} className="icon-button">
      <FaDownload /> <span>Dışa Aktar</span>
    </button>
  </div>
);

export default ButtonContainer;
