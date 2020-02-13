import { connect } from 'react-redux';
import { TagSaveHeader } from '../views/TagSaveHeader';
import { resetError } from '../actions/actions';

function mapStateToProps(state) {
  return { submitError: state.submitError };
}

const mapDispatchToState = { resetError: resetError };

export const SaveTagContainer = connect(
  mapStateToProps,
  mapDispatchToState,
)(TagSaveHeader);
