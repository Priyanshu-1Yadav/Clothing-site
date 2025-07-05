import React from 'react';
import { useVariableContext } from '../../context/VariableContext';

const ImageGallery = ({ images, currentImageIndex, onThumbnailClick }) => {
  const { host } = useVariableContext();

  return (
    <div className="image-gallery">
      <div className="main-image-container">
        <img
          src={`${host}/${images[currentImageIndex]}`}
          alt="Product"
          className="main-image"
        />
      </div>
      <div className="thumbnail-images">
        {images.map((image, index) => (
          <img
            key={index}
            src={`${host}/${image}`}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${currentImageIndex === index ? 'selected' : ''}`}
            onClick={() => onThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
