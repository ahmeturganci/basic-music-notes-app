import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTrash, FaDownload, FaGithub, FaBars } from 'react-icons/fa';
const MenuContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
`;

const MenuButton = styled.button`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: none;
    background: #f0f0f0;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 1001;
  }
`;

const MenuItems = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 10px;
  
  @media (min-width: 769px) {
    display: flex !important;
    flex-direction: row;
    position: static;
    box-shadow: none;
    background: transparent;
  }
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 10px;
    background: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    width: 200px;
    z-index: 1000;
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  background: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #e0e0e0;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const Menu = ({ clearNotes, exportImage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuContainer>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </MenuButton>
      <MenuItems isOpen={isOpen}>
        <IconButton onClick={clearNotes} title="Clear Notes">
          <FaTrash /> Clear Notes
        </IconButton>
        <IconButton onClick={exportImage} title="Export as Image">
          <FaDownload /> Export Image
        </IconButton>
        <IconButton 
          onClick={() => window.open('https://github.com/ahmeturganci/basic-music-notes-app', '_blank')} 
          title="GitHub Repository"
        >
          <FaGithub /> GitHub
        </IconButton>
      </MenuItems>
    </MenuContainer>
  );
};

export default Menu;