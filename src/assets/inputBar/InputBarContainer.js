import { connect } from 'react-redux';
import { postTags, resetGrid, overrideTags } from '../../actions/actions';
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
    //it's not done saving by the time the fetches are called henceforthwith, it's not showing up in the image data, but it does show in tags hm.
    confirmSubmit: (imageId, value, gridId) => {
      dispatch(postTags({ imageId, value, gridId }));
      dispatch(resetGrid());
    },
    overrideTag: (tagId, imageKey, gridId) => {
      dispatch(overrideTags(tagId, imageKey, gridId));
    },
  };
}

export const InputBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputBox);
