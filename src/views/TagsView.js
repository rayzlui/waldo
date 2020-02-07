import React from 'react';
import PropTypes from 'prop-types';

export function TagsView(props) {
  const { isViewingTags, searchedTag, imageIndex, selectImage } = props;
  const { database, currentSearch } = searchedTag;
  if (!isViewingTags) return null;
  function buildTagSection(name, imageKeys) {
    let images = imageKeys.map(key => {
      if (key === null) {
        return null;
      }
      let correctImg = imageIndex.find(img => img.key === key);
      let imageSrc = correctImg.photo;
      return (
        <img
          className={'thumbnail__sized'}
          src={imageSrc}
          alt={`it's a ${name}`}
          key={name}
          onClick={() => selectImage(correctImg)}
        />
      );
    });
    let sect = (
      <section>
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
