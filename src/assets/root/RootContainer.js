import { resetGrid } from '../../actions/actions';
import { connect } from 'react-redux';
import { RootView } from './RootView';

function mapStateToProps(state) {
  return {
    isViewingTags: state.isViewingTags,
  };
}

const mapDispatchToProps = {
  resetGrid: resetGrid,
};

export const RootContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootView);
