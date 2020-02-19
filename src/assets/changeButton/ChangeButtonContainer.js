import { connect } from 'react-redux';
import { toggleMode } from '../../actions/actions';
import { ChangeToTagButton } from './ChangeModeButton';

function mapStateToProps(state) {
  return {
    isTagMode: state.isTagMode,
  };
}

const mapDispatchToProps = {
  changeGameMode: toggleMode,
};

export const ChangeButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangeToTagButton);
