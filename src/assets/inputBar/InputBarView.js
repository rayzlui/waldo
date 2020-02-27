import React from 'react';
import PropTypes from 'prop-types';

export function InputBox(props) {
  let { confirmSubmit, currentImage, gridId, isTagMode, overrideTag } = props;
  if (!isTagMode) return null;
  if (!currentImage) return null;
  let imageId = currentImage.key;
  function submitTags(event) {
    let key = event.keyCode || event.which;
    if (key === 13) {
      let value = event.target.value;
      let saveTag = window.confirm('Save tag to image?');
      if (saveTag) {
        let tagId = currentImage.tags[gridId];
        let imageKey = currentImage.key;
        if (tagId) {
          let override = window.confirm(
            'There is already a tag here, would you like to override?',
          );
          if (!override) {
            return null;
          }
          overrideTag(tagId, imageKey, gridId);
        }
        confirmSubmit(imageId, value, gridId);
      }
    }
  }
  return (
    <input
      className="input-popup-box"
      type="text"
      onKeyPress={e => submitTags(e)}
    />
  );
}

InputBox.propTypes = {
  isTagMode: PropTypes.bool,
  confirmSubmit: PropTypes.func,
  currentImage: PropTypes.object,
  gridId: PropTypes.number,
  overrideTag: PropTypes.func,
};
