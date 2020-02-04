import React from 'react';
import PropTypes from 'prop-types';

export function NetworkError(props) {
  const { error, requestData } = props;
  if (error === null) {
    requestData();
    return null;
  }
  if (error) {
    setTimeout(() => requestData(), 5000);
    return (
      <h3>
        UNABLE TO CONTACT SERVER, PLEASE PLAY WITH MINIONS FOR TIME BEING. APP
        WILL AUTOMATICALLY REQUEST DATA AGAIN IN 5 SECONDS.
      </h3>
    );
  }
  return null;
}

NetworkError.propTypes = {
  error: PropTypes.bool,
  requestData: PropTypes.func,
};
