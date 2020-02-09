import { selectImage, viewImage } from '../actions/actions';
import { connect } from 'react-redux';
import { TagsView } from '../views/TagsView';

function mapStateToProps(state) {
  return {
    isViewingTags: state.isViewingTags,
    searchedTag: state.searchedTag,
    imageIndex: state.index,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectImage: img => {
      dispatch(selectImage(img));
      dispatch(viewImage());
    },
  };
}

export const TagViewsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagsView);
