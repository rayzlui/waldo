import { connect } from 'react-redux';
import { TagSaveHeader } from '../views/TagSaveHeader';
import { resetError } from '../actions/actions';

function mapStateToProps(state) {
  return { submitError: state.submitError };
}

function mapDispatchToState(dispatch) {
  return { resetError: () => dispatch(resetError()) };
}

export const SaveTagContainer = connect(
  mapStateToProps,
  mapDispatchToState,
)(TagSaveHeader);
