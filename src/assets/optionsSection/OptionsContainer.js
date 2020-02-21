import { connect } from 'react-redux';
import { updateScore, resetGrid } from '../../actions/actions';
import { OptionsView } from './Option';

function mapStateToProps(state, ownProps) {
  const { gridId } = ownProps;
  return {
    gridId: gridId,
    currentImage: state.index.currentImage,
    tags: state.tags,
    isTagMode: state.isTagMode,
  };
}

const mapDispatchToProps = {
  updateScore: updateScore,
  resetGrid: resetGrid,
};

export const OptionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OptionsView);
