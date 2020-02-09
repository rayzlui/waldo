import React from 'react';
import { ScoreHeaderContainer } from '../containers/ScoreHeaderContainer';
import { ScoreContainer } from '../containers/ScoreContainer';
import { CurrentImageContainer } from '../containers/CurrentImageContainer';
import { GridDOM } from './GridDOM';
import PropTypes from 'prop-types';

export function ImageViewDisplay(props) {
  const { isViewingTags } = props;
  if (isViewingTags) return null;
  return (
    <section className="selected__image">
      <ScoreHeaderContainer />
      <ScoreContainer />
      <GridDOM />
      <CurrentImageContainer />
    </section>
  );
}

ImageViewDisplay.propTypes = {
  isViewingTags: PropTypes.bool,
};
