import React from 'react';
import PropTypes from 'prop-types';

export function AddNewImageView(props) {
  const { index, submitImage } = props;
  let keyNum = index.length;
  //we'll pass index length as the key because that's how many images there currently are.
  function handleSubmit(event) {
    let key = event.keyCode || event.which;
    if (key === 13) {
      //this is essentially the submit for newtag.
      let value = event.target.value;
      let saveTag = window.confirm('Save image?');
      if (saveTag) {
        submitImage(keyNum, value);
      }
    }
  }
  return (
    <form className={'add__new__image__form'}>
      <label>Please enter url for image</label>
      <input type="text" onKeyPress={event => handleSubmit(event)} />
      <input type="submit" />
    </form>
  );
}

AddNewImageView.propTypes = {
  index: PropTypes.array,
  submitImage: PropTypes.func,
};
