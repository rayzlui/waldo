import { connect } from 'react-redux';
import {
  postTags,
  resetGrid,
  retrieveImageIndex,
  retrieveAllTags,
  resetCurrentImage,
} from '../../actions/actions';
import { InputBox } from './InputBarView';

function mapStateToProps(state, ownProps) {
  let { gridId } = ownProps;
  return {
    gridId: gridId,
    currentImage: state.index.currentImage,
    isTagMode: state.isTagMode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    confirmSubmit: (imageId, value, gridId) => {
      dispatch(postTags({ imageId, value, gridId }));
      dispatch(retrieveImageIndex());
      dispatch(retrieveAllTags());
      dispatch(resetCurrentImage(imageId));
      dispatch(resetGrid());
    },
  };
}

export const InputBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputBox);
