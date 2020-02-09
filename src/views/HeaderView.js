import React from 'react';
import PropTypes from 'prop-types';

export function HeaderView(props) {
  const { isTagMode } = props;
  if (isTagMode) {
    return <h1>Tag This Photo!</h1>;
  }
  return <h1>Guess The Tags</h1>;
}

HeaderView.propTypes = {
  isTagMode: PropTypes.bool,
};
