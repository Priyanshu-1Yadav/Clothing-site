import React from 'react';

const ColorOption = ({ color, isSelected, handleClick }) => (
  <button
    onClick={handleClick}
    className={`color-option ${isSelected ? 'selected' : ''}`}
    style={{ backgroundColor: color }}
  />
);

export default ColorOption;
