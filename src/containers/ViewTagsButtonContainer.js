import { connect } from 'react-redux';
import { ViewTagsButton } from '../views/ChangeModeButton';
import { viewTags, resetTagSearch, viewImage } from '../actions/actions';

function mapStateToProps(state) {
  return {
    isViewingTags: state.isViewingTags,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    viewAllTags: isViewing => {
      if (!isViewing) {
        dispatch(viewTags());
        dispatch(resetTagSearch());
      } else {
        dispatch(viewImage());
      }
    },
  };
}

export const ViewTagsButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewTagsButton);
