import React from 'react';
import '../App.css';

const NoteLegend = ({ noteTypes }) => {
  console.log('noteTypes:', noteTypes); // Debug log

  return (
    <div className="note-legend">
      <h4>Note Types</h4>
      {Object.entries(noteTypes).map(([type, noteData]) => {
        console.log('type:', type, 'noteData:', noteData); // Debug log
        return (
          <div key={type} className="legend-item">
            <span 
              className="color-box" 
              style={{ backgroundColor: noteData.color }}
            ></span>
            <span>{noteData.name || type}</span>
            <span style={{ marginLeft: '8px', color: '#666', fontSize: '12px', color: noteData.color }}>
              {noteData.color}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default NoteLegend;