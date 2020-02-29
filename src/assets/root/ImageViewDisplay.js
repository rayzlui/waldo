import React from 'react';
import { ScoreHeaderContainer } from '../scoreHeader/ScoreHeaderContainer';
import { ScoreContainer } from '../scoreSection/ScoreContainer';
import { CurrentImageContainer } from '../currentImage/CurrentImageContainer';
import { GridDOM } from '../buildGrid/GridDOM';
import PropTypes from 'prop-types';
import { EditImageContainer } from '../editImage/EditImageContainer';
import { DeleteImageContainer } from '../deleteImage/DeleteImageContainer';
import { ImageIndexContainer } from '../imageIndex/ImageIndexContainer';
import { NewImageContainer } from '../addNewImage/NewImageContainer';

export function ImageViewDisplay(props) {
  const { isViewingTags } = props;
  if (isViewingTags) return null;
  return (
    <section className="selected__image">
      <NewImageContainer />
      <ImageIndexContainer />
      <ScoreHeaderContainer />
      <ScoreContainer />
      <EditImageContainer />
      <DeleteImageContainer />
      <GridDOM />
      <CurrentImageContainer />
    </section>
  );
}

ImageViewDisplay.propTypes = {
  isViewingTags: PropTypes.bool,
};
