import { resetGrid } from '../actions/actions';
import { connect } from 'react-redux';
import { RootView } from '../views/RootView';

function mapDispatchToProps(dispatch) {
  return {
    resetGrid: () => dispatch(resetGrid()),
  };
}

export const RootContainer = connect(
  null,
  mapDispatchToProps,
)(RootView);
