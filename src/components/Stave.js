import React from 'react';

const LedgerLines = ({ noteY, cx }) => {
  const linePositions = [];
  const baseY = 60;

  return linePositions.map((y, index) => (
    <line
      key={`ledger-${index}`}
      x1={cx - 15}
      y1={y}
      x2={cx + 15}
      y2={y}
      stroke="black"
      strokeWidth="1"
    />
  ));
};

const Stave = ({ staveRef, notes, handleStaveClick, noteTypes }) => (
  <div className="stave-container">
    <svg
      ref={staveRef}
      className="stave"
      onClick={handleStaveClick}
      width="500"
      height="300"
      viewBox="0 0 500 200" // Corrected viewBox
    >
      <g className="guide-lines" opacity="0.8">
        {[...Array(5)].map((_, index) => (
          <line
            key={`upper-${index}`}
            x1="20"
            y1={45 - index * 15}
            x2="480" // Adjusted x2 to fit the new viewBox
            y2={45 - index * 15}
            stroke="#ccc"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
        ))}
        {[...Array(5)].map((_, index) => (
          <line
            key={`lower-${index}`}
            x1="20"
            y1={180 + index * 15}
            x2="480" // Adjusted x2 to fit the new viewBox
            y2={180 + index * 15}
            stroke="#ccc"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
        ))}
        {[...Array(4)].map((_, index) => (
          <line
            key={`helper-${index}`}
            x1="20"
            y1={75 + index * 30}
            x2="480" // Adjusted x2 to fit the new viewBox
            y2={75 + index * 30}
            stroke="#ccc"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
        ))}
      </g>
      <g className="main-lines">
        {[...Array(5)].map((_, index) => (
          <line
            key={index}
            x1="20"
            y1={60 + index * 30}
            x2="480" // Adjusted x2 to fit the new viewBox
            y2={60 + index * 30}
            stroke="black"
            strokeWidth="1"
          />
        ))}
      </g>
      <text 
      opacity={0.5}
        x="0" 
        y="120" 
        fontSize="220" 
        className="clef"
        dominantBaseline="middle"
        style={{
          fontFamily: 'Times New Roman',
          fontWeight: 'normal'
        }}
      >𝄞</text>
      {notes.map((note) => (
        <g key={note.id}>
          <LedgerLines noteY={note.style.cy} cx={note.style.cx} />
          <ellipse
            cx={note.style.cx}
            cy={note.style.cy}
            rx="12"
            ry="8"
            fill={note.type == 'whole' || note.type === 'half' ? 'white' : noteTypes[note.type].color}
            stroke={noteTypes[note.type].color}
            strokeWidth="2"
            transform={`rotate(-30, ${note.style.cx}, ${note.style.cy})`}
          />
          {note.type !== 'whole' && (
            <line
              x1={note.style.cx + 11}
              y1={note.style.cy}
              x2={note.style.cx + 11}
              y2={note.type === 'half' ? note.style.cy - 80 : note.style.cy - 60}
              stroke={noteTypes[note.type].color}
              strokeWidth="1.5"
            />
          )}
        </g>
      ))}
    </svg>
  </div>
);

export default Stave;
