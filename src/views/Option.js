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
  let imageTags = currentImage.tags.reduce((acc, curr) => {
    let key = curr[1];
    let id = curr[0];
    acc[key] = id;
    return acc;
  }, {});
  if (imageTags[gridId] === undefined) return null;
  //just take tags from current image because rest isn't necessary?
  let options = [];
  let tag;
  let val;
  let randomKey;
  //random decides which select option is going to be the correct one.
  //if we're playing game we should ONLY USE KEYS THAT HAVE VALUES.
  let tagKeys = Object.keys(imageTags);
  tagKeys.splice(tagKeys.indexOf(gridId.toString()), 1);
  //remove id from the wrong options to prevent duplicate correct answer.

  let limit = tagKeys.length > 4 ? 4 : tagKeys.length; //

  let winningLocation = Math.floor(Math.random() * limit);
  //random is
  for (let i = 0; i <= limit; i++) {
    //randomKey gets a random id from the tags

    //val is true/false. if val == 1, it's the correct option, if val == 0, it's incorrect.
    if (i === winningLocation) {
      tag = tags[imageTags[gridId]];
      val = 1;
      randomKey = gridId;
    } else {
      //if it's i is not the winningLocation number (which determines where the correct answer should be placed).
      randomKey = tagKeys.splice(
        Math.floor((tagKeys.length - 1) * Math.random()),
        1,
      )[0];
      tag = tags[imageTags[randomKey]];
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
  tags: PropTypes.array,
};
