import React from 'react';
import PropTypes from 'prop-types';

export function CurrentImage(props) {
  //photoDOM only deals with the DOM stuff, we'll have an actual photo
  //class that will break down the info from the database (namely the photourl and tags)

  let { currentImage, selectImage, isIndex } = props;
  if (!currentImage) return null;
  let className = isIndex ? 'select__index' : 'main__image';
  if (!selectImage) {
    selectImage = () => null;
  }
  return (
    <img
      src={currentImage.photo}
      className={className}
      onClick={() => selectImage(currentImage)}
      alt={'ohnoesy i broked'}
    />
  );
}

CurrentImage.propTypes = {
  selectImage: PropTypes.func,
  currentImage: PropTypes.object,
  isIndex: PropTypes.bool,
};
