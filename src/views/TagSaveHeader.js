import React from 'react';
import PropTypes from 'prop-types';

export function TagSaveHeader(props) {
  const { submitError, resetError } = props;
  if (submitError === null) return null;

  setTimeout(() => {
    resetError();
  }, 2000);
  if (submitError) {
    return <h2 className={`success tag__save__header`}>Tag Save Successful</h2>;
  } else {
    return <h2 className={`error tag__save__header`}>Unable To Save Tag</h2>;
  }
}

TagSaveHeader.propTypes = {
  submitError: PropTypes.bool,
  resetError: PropTypes.func,
};
