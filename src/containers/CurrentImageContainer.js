import { connect } from 'react-redux';
import { CurrentImage } from '../views/CurrentImageView';

function mapStateToProps(state) {
  return {
    currentImage: state.currentImage,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  let { selectImage } = ownProps;
  if (!selectImage) {
    selectImage = () => null;
  }
  return {
    selectImage: selectImage,
  };
}

export const CurrentImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrentImage);
