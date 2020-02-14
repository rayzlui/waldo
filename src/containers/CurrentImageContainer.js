import { connect } from 'react-redux';
import { CurrentImage } from '../views/CurrentImageView';

function mapStateToProps(state) {
  return {
    currentImage: state.currentImage,
  };
}

export const CurrentImageContainer = connect(mapStateToProps)(CurrentImage);
