import { connect } from 'react-redux';
import { selectImage, resetScore } from '../actions/actions';
import { ImageIndex } from '../views/ImageIndex';

function mapStateToProps(state) {
  return {
    index: state.index,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectImage: imageData => {
      dispatch(selectImage(imageData));
      dispatch(resetScore());
    },
  };
}

export const ImageIndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageIndex);
