import React from 'react';
import PropTypes from 'prop-types';

export function ScoreHeader(props) {
  let { isTagMode } = props;
  if (isTagMode) return null;
  return (
    <div className="scorecard-change-to-tag-buttons">
      <h3 id="score-card">Score</h3>
    </div>
  );
}

ScoreHeader.propTypes = {
  isTagMode: PropTypes.bool,
};
