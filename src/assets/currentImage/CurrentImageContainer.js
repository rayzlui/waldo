import { connect } from 'react-redux';
import { CurrentImage } from './CurrentImageView';

function mapStateToProps(state) {
  return {
    currentImage: state.index.currentImage,
  };
}

export const CurrentImageContainer = connect(mapStateToProps)(CurrentImage);
