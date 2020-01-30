import { connect } from 'react-redux';
import { toggleMode } from '../actions/actions';
import { ChangeToTagButton } from '../views/ChangeModeButton';

function mapStateToProps(state) {
  return {
    isTagMode: state.isTagMode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeGameMode: () => dispatch(toggleMode()),
  };
}

export const ChangeButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangeToTagButton);
