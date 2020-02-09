import { connect } from 'react-redux';
import { postTags, resetGrid } from '../actions/actions';
import { InputBox } from '../views/InputBarView';

function mapStateToProps(state, ownProps) {
  let { gridId } = ownProps;
  return {
    gridId: gridId,
    currentImage: state.currentImage,
    isTagMode: state.isTagMode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    confirmSubmit: (imageId, value, gridId) => {
      dispatch(postTags({ imageId, value, gridId }));
      dispatch(resetGrid());
    },
  };
}

export const InputBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputBox);
