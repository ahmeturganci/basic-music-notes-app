import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { FaTrash, FaDownload, FaGithub } from 'react-icons/fa';
import './App.css';
import Stave from './components/Stave';
import NoteTypeSelector from './components/NoteTypeSelector';

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNoteType, setSelectedNoteType] = useState(null);
  const [clickPosition, setClickPosition] = useState(null);
  const [exportText, setExportText] = useState(""); // Add state for export text
  const staveRef = useRef(null);

  const noteTypes = {
    whole: { name: "1'lik nota", color: '#000000', duration: 1 },
    half: { name: "2'lik nota", color: '#000000', duration: 2 },
    quarter: { name: "4'lük nota", color: '#000000', duration: 4 },
    eighth: { name: "8'lik nota", color: '#000000', duration: 8 },
    sixteenth: { name: "16'lik nota", color: '#000000', duration: 16 }
  };

  // const handleStaveClick = (event) => {
  //   const svg = staveRef.current;
  //   const point = svg.createSVGPoint();
  //   point.x = event.clientX;
  //   point.y = event.clientY;
  //   const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());

  //   if (!selectedNoteType) {
  //     setClickPosition({ x: event.clientX, y: event.clientY });
  //     return;
  //   }

  //   const { offsetX, offsetY } = event.nativeEvent;
  //   const middleLinePosition = 120; // Adjust this value based on your stave's middle line position

  //   const isBelowMiddleLine = offsetY > middleLinePosition;
  //   const stemDirection = isBelowMiddleLine ? 'down' : 'up';

  //   const lineSpacing = 15;
  //   const basePosition = 60;
  //   const topPosition = -15;
  //   const bottomPosition = 255;
  //   const highNoteLimit = 0;

  //   const notePosition = Math.round((svgPoint.y - basePosition) / lineSpacing) * lineSpacing + basePosition;

  //   if (notePosition < highNoteLimit && selectedNoteType !== 'whole') {
  //     return;
  //   }

  //   if (notePosition >= topPosition && notePosition <= bottomPosition) {
  //     setNotes(prevNotes => [...prevNotes, {
  //       id: Date.now(),
  //       style: {
  //         cx: svgPoint.x,
  //         cy: notePosition,
  //         rx: 8, // Adjust the horizontal radius
  //         ry: 12, // Adjust the vertical radius
  //         fill: noteTypes[selectedNoteType].color, // Set the fill color based on note type
  //         stemHeight: -35 // Extend the stem height
  //       },
  //       type: selectedNoteType
  //     }]);
  //   }
  //   setSelectedNoteType(null);
  // };

  const handleStaveClick = (event) => {
    const svg = staveRef.current;
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());
  
    if (!selectedNoteType) {
      setClickPosition({ x: event.clientX, y: event.clientY });
      return;
    }
  
    const MIDDLE_LINE_Y = 120; // 3rd line position
    const lineSpacing = 15;
    const basePosition = 60;
    const topPosition = -15;
    const bottomPosition = 255;
    const highNoteLimit = 0;
  
    const notePosition = Math.round((svgPoint.y - basePosition) / lineSpacing) * lineSpacing + basePosition;
    const isBelowMiddleLine = notePosition > MIDDLE_LINE_Y;
  
    if (notePosition < highNoteLimit && selectedNoteType !== 'whole') {
      return;
    }
  
    if (notePosition >= topPosition && notePosition <= bottomPosition) {
      setNotes(prevNotes => [...prevNotes, {
        id: Date.now(),
        style: {
          cx: svgPoint.x,
          cy: notePosition,
          rx: 8,
          ry: 12,
          fill: noteTypes[selectedNoteType].color,
          stemHeight: isBelowMiddleLine ? 35 : -35, // Change stem direction based on position
          stemDirection: isBelowMiddleLine ? 'down' : 'up'
        },
        type: selectedNoteType
      }]);
    }
    setSelectedNoteType(null);
  };

 
  const clearNotes = () => setNotes([]);

  const exportImage = () => {
    const text = prompt("Enter text for export:");
    if (text !== null) {
      setExportText(text);
    }

    const svgContainer = document.querySelector('.stave-container');

    html2canvas(svgContainer, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      onclone: (clonedDoc) => {
        const clonedSvg = clonedDoc.querySelector('.stave');
        clonedSvg.style.width = '500px';
        clonedSvg.style.height = '300px';

        // Add text overlay directly on the SVG
        const textElement = clonedDoc.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElement.setAttribute('x', '50%');
        textElement.setAttribute('y', '1');
        textElement.setAttribute('font-size', '50');
        textElement.setAttribute('fill', 'black');
        textElement.setAttribute('text-anchor', 'middle');
        textElement.textContent = text;
        clonedSvg.appendChild(textElement);
      }
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'music-notes.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  return (
    <div className="App">
      <div className="menu">
        <button className="icon-button" onClick={clearNotes} title="Clear Notes">
          <FaTrash />
        </button>
        <button className="icon-button" onClick={exportImage} title="Export as Image">
          <FaDownload />
        </button>
        <button className="icon-button" onClick={() => window.open('https://github.com/ahmeturganci/basic-music-notes-app', '_blank')} title="GitHub Repository">
          <FaGithub />
        </button>
      </div>
      <div className="content">
        <Stave
          staveRef={staveRef}
          notes={notes}
          handleStaveClick={handleStaveClick}
          noteTypes={noteTypes}
        />
        {clickPosition && !selectedNoteType && (
          <NoteTypeSelector
            position={clickPosition}
            noteTypes={noteTypes}
            setSelectedNoteType={setSelectedNoteType}
          />
        )}
      </div>
    </div>
  );
}

export default App;