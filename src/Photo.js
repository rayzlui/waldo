import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

class Photo extends React.Component {
  //photoDOM only deals with the DOM stuff, we'll have an actual photo
  //class that will break down the info from the database (namely the photourl and tags)
  selectPhoto() {
    this.props.selectPhoto(this.props.id);
  }

  render() {
    let click = null;
    if (this.props.height > 1) {
      click = this.selectPhoto.bind(this);
    }

    return (
      <img
        src={this.props.photo}
        alt={'ohnoesy i broked'}
        onClick={click}
        style={{
          height: 500 / this.props.height,
          width: 800 / this.props.width,
          display: 'inline-block',
        }}
      />
    );
  }
}

export default Photo;

Photo.propTypes = {
  selectPhoto: PropTypes.func,
  height: PropTypes.number,
  photo: PropTypes.string,
  width: PropTypes.number,
  id: PropTypes.number,
};
