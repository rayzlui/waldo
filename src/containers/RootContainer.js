import {
  resetGrid,
  viewTags,
  resetTagSearch,
  viewImage,
} from '../actions/actions';
import { connect } from 'react-redux';
import { RootView } from '../views/RootView';

function mapStateToProps(state) {
  return {
    isViewingTags: state.isViewingTags,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetGrid: () => dispatch(resetGrid()),
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

export const RootContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootView);
