import { connect } from 'react-redux';
import Grid from '../views/Grid';
import { changeGrid, resetGrid } from '../actions/actions';

function mapStateToProps(state) {
  return {
    currentImage: state.currentImage,
    currentGrid: state.currentGrid,
    tags: state.tags,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeGrid: gridId => dispatch(changeGrid(gridId)),
    resetGrid: resetGrid,
  };
}

export const GridContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Grid);
