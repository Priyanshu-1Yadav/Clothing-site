import React from 'react';

const SizeOption = ({ size, isSelected, handleClick }) => (
  <button
    onClick={handleClick}
    className={`size-option ${isSelected ? 'selected' : ''}`}
  >
    {size}
  </button>
);

export default SizeOption;
