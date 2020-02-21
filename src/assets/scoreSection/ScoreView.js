import React from 'react';
import PropTypes from 'prop-types';

export function ScoreCard(props) {
  let { score, isTagMode } = props;
  if (isTagMode) return null;
  return <p id="scorecard">{score}</p>;
}
ScoreCard.propTypes = {
  score: PropTypes.number,
  isTagMode: PropTypes.bool,
};
