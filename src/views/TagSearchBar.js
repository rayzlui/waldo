import React from 'react';
import PropTypes from 'prop-types';

export function TagSearchBarView(props) {
  const { searchTag } = props;

  function handleEnter(event) {
    let key = event.keyCode || event.which;
    if (key === 13) {
      searchTag(event.target.value);
      event.target.value = '';
    }
  }
  return (
    <section className="tag__search__bar">
      <p>Search Tags</p>
      <input type="text" onKeyDown={event => handleEnter(event)} />
    </section>
  );
}

TagSearchBarView.propTypes = {
  searchTag: PropTypes.func,
};
