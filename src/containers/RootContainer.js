import { resetGrid } from '../actions/actions';
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
  };
}

export const RootContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootView);
