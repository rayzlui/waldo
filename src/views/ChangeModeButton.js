import React from 'react';
import PropTypes from 'prop-types';

export function ChangeToTagButton(props) {
  let { isTagMode, changeGameMode } = props;
  if (!isTagMode) {
    return (
      <button id="change-tag-button" onClick={() => changeGameMode()}>
        Tag My Own Names!
      </button>
    );
  } else {
    return (
      <button id="change-tag-button" onClick={() => changeGameMode()}>
        LET ME GUESS NAMES?!
      </button>
    );
  }
}

ChangeToTagButton.propTypes = {
  isTagMode: PropTypes.bool,
  changeGameMode: PropTypes.func,
};

export function ViewTagsButton(props) {
  const { isViewingTags, viewAllTags } = props;
  return (
    <button onClick={() => viewAllTags(isViewingTags)}>
      {!isViewingTags ? 'View Tags' : 'View Images'}
    </button>
  );
}

ViewTagsButton.propTypes = {
  isViewingTags: PropTypes.bool,
  viewAllTags: PropTypes.func,
};
