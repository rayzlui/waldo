import React from 'react';
import PropTypes from 'prop-types';

export function EditImageView(props) {
  const { currentImage, editImage } = props;
  if (currentImage === null) return null;
  function handleEdit(event) {
    let key = event.keyCode || event.which;
    if (key === 13) {
      //this is essentially the submit for newtag.
      let value = event.target.value;
      let saveTag = window.confirm('edit image?');
      if (saveTag) {
        editImage({ id: currentImage._id, url: value });
      }
    }
  }
  return (
    <section className={'edit__image'}>
      <label>Edit Image</label>
      <input type="text" onKeyPress={event => handleEdit(event)} />
    </section>
  );
}

EditImageView.propTypes = {
  currentImage: PropTypes.object,
  editImage: PropTypes.func,
};
