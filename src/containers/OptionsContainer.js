import { connect } from 'react-redux';
import { updateScore, resetGrid } from '../actions/actions';
import { OptionsView } from '../views/Option';

function mapStateToProps(state, ownProps) {
  const { gridId } = ownProps;
  return {
    gridId: gridId,
    currentImage: state.currentImage,
    tags: state.tags,
    isTagMode: state.isTagMode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateScore: () => dispatch(updateScore()),
    resetGrid: () => dispatch(resetGrid()),
  };
}

export const OptionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OptionsView);
