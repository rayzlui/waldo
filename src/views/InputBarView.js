import React from 'react';
import PropTypes from 'prop-types';

export function InputBox(props) {
  let { confirmSubmit, currentImage, gridId, isTagMode } = props;
  if (!isTagMode) return null;
  if (!currentImage) return null;
  let imageId = currentImage.key;
  function submitTags(event) {
    let key = event.keyCode || event.which;
    if (key === 13) {
      //this is essentially the submit for newtag.
      let value = event.target.value;
      let saveTag = window.confirm('Save tag to image?');
      if (saveTag) {
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
};
