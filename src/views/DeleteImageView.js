import React from 'react';
import PropTypes from 'prop-types';

export function DeleteImageButton(props) {
  const { deleteImage, currentImage } = props;
  if (currentImage === null) return null;
  return (
    <button
      className={'delete__image__buton'}
      onClick={() => deleteImage(currentImage._id)}
    >
      Delete Image
    </button>
  );
}

DeleteImageButton.propTypes = {
  deleteImage: PropTypes.func,
  currentImage: PropTypes.number,
};
