import React from 'react';

const NoteTypeSelector = ({ position, noteTypes, setSelectedNoteType }) => (
  <div className="note-type-selector" style={{
    position: 'absolute',
    left: position.x,
    top: position.y
  }}>
    {Object.entries(noteTypes).map(([type, details]) => (
      <button
        key={type}
        onClick={() => setSelectedNoteType(type)}
        style={{ backgroundColor: details.color }}
      >
        <span className="note-symbol">{details.symbol}</span>
        {details.name}
      </button>
    ))}
  </div>
);

export default NoteTypeSelector;
