import { connect } from 'react-redux';
import Grid from './Grid';
import { changeGrid, resetGrid } from '../../actions/actions';

function mapStateToProps(state) {
  return {
    currentImage: state.index.currentImage,
    currentGrid: state.currentGrid,
    tags: state.tags,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeGrid: id => dispatch(changeGrid(id)),
    resetGrid: () => dispatch(resetGrid()),
  };
}

export const GridContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Grid);
