import React from 'react';
import PropTypes from 'prop-types';

export function CurrentImage(props) {
  //photoDOM only deals with the DOM stuff, we'll have an actual photo
  //class that will break down the info from the database (namely the photourl and tags)

  let { currentImage, selectImage, isIndex } = props;
  if (!currentImage) return null;
  let className = isIndex ? 'select__index' : 'main__image';
  return (
    <img
      src={currentImage.photo}
      className={className}
      onClick={() => selectImage(currentImage)}
      alt={'ohnoesy i broked'}
      style={{
        //height: 500 / this.props.height,
        //width: 800 / this.props.width,
        display: 'inline-block',
      }}
    />
  );
}

CurrentImage.propTypes = {
  selectImage: PropTypes.func,
  currentImage: PropTypes.string,
  isIndex: PropTypes.bool,
};
