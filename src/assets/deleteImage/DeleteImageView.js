import React from 'react';
import PropTypes from 'prop-types';

export function DeleteImageButton(props) {
  const { deleteImage, currentImage, isViewingTags } = props;
  if (currentImage === null || isViewingTags) return null;
  function handleClick() {
    let confirm = window.confirm('Delete image is permanent?');
    if (confirm) {
      deleteImage(currentImage.key);
    }
  }
  return (
    <button className={'delete__image__buton'} onClick={() => handleClick()}>
      Delete Image
    </button>
  );
}

DeleteImageButton.propTypes = {
  deleteImage: PropTypes.func,
  currentImage: PropTypes.object,
  isViewingTags: PropTypes.bool,
};
