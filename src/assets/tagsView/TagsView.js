import React from 'react';
import PropTypes from 'prop-types';

export function TagsView(props) {
  const { isViewingTags, searchedTag, imageIndex, selectImage } = props;
  const { database, currentSearch } = searchedTag;
  if (!isViewingTags) return null;
  function buildTagSection(name, imageKeys) {
    let images = [];
    for (let i in imageKeys) {
      let correctImg = imageIndex[i];
      let imageSrc = correctImg.photo;
      images.push(
        <img
          className={'thumbnail__sized'}
          src={imageSrc}
          alt={`it's a ${name}`}
          key={name + i}
          onClick={() => selectImage(correctImg)}
        />,
      );
    }
    let sect = (
      <section key={name}>
        <h3>{name}</h3>
        {images}
      </section>
    );
    return sect;
  }
  if (currentSearch === null) {
    //show index view
    let display = [];
    for (let i in database) {
      let name = i;
      let imageKeys = database[i];
      let sect = buildTagSection(name, imageKeys);
      display.push(sect);
    }
    return (
      <section>
        <h2>All Tags</h2>
        {display}
      </section>
    );
  }

  return (
    <section>
      {buildTagSection(currentSearch.tag, currentSearch.imageIds)}
    </section>
  );
}

TagsView.propTypes = {
  currentSearch: PropTypes.object,
  database: PropTypes.object,
  imageIndex: PropTypes.array,
  isViewingTags: PropTypes.bool,
  searchedTag: PropTypes.object,
  selectImage: PropTypes.func,
};
