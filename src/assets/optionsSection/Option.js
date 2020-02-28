import React from 'react';
import PropTypes from 'prop-types';

function checkTagForGame(e, updateScore, resetGrid) {
  //used to check if selected name is correct.
  let val = e.target.value / 1;
  if (val === 1) {
    alert('Correct');
    updateScore(2);
  } else {
    alert('Incorrect');
  }
  resetGrid();
}

export function OptionsView(props) {
  let { gridId, updateScore, currentImage, isTagMode, resetGrid, tags } = props;
  if (isTagMode) return null;
  if (!currentImage || !tags) return null;
  let imageTags = currentImage.tags;
  if (imageTags[gridId] === undefined) return null;
  //just take tags from current image because rest isn't necessary?
  let options = [];
  let tag;
  let val;
  let randomKey;
  let tagKeys = Object.keys(imageTags);
  let limit = tagKeys.length > 4 ? 4 : tagKeys.length; //
  tagKeys.splice(tagKeys.indexOf(gridId.toString()), 1);
  let winningLocation = Math.floor(Math.random() * (limit - 1));
  for (let i = 0; i < limit; i++) {
    if (i === winningLocation) {
      tag = tags[imageTags[gridId]].tag;
      val = 1;
      randomKey = gridId;
    } else {
      //if it's i is not the winningLocation number (which determines where the correct answer should be placed).
      randomKey = tagKeys.splice(
        Math.floor((tagKeys.length - 1) * Math.random()),
        1,
      )[0];
      tag = tags[imageTags[randomKey]].tag;
      val = 0;
    }
    options.push(
      <option
        value={val}
        key={randomKey}
        id={randomKey}
        onClick={event => checkTagForGame(event, updateScore, resetGrid)}
      >
        {tag}
      </option>,
    );
  }
  return options;
}

OptionsView.propTypes = {
  currentImage: PropTypes.object,
  updateScore: PropTypes.func,
  gridId: PropTypes.number,
  isTagMode: PropTypes.bool,
  resetGrid: PropTypes.func,
  tags: PropTypes.object,
};
