import PropTypes from 'prop-types';
import React from 'react';
import { CurrentImage } from '../currentImage/CurrentImageView';

export function ImageIndex(props) {
  let { index, selectImage } = props;
  let display = [];
  for (let i = 0; i < index.length; i++) {
    //need an click event listener to select photo.
    display.push(
      <CurrentImage
        key={`image ${i}`}
        isIndex={true}
        currentImage={index[i]}
        selectImage={selectImage}
      />,
    );
  }
  return <section className="image__index">{display}</section>;
}

ImageIndex.propTypes = {
  index: PropTypes.array,
  selectImage: PropTypes.func,
};
