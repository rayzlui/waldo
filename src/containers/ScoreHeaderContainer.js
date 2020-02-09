import { connect } from 'react-redux';
import { ScoreHeader } from '../views/ScoreHeaderView';

function mapStateToProps(state) {
  return {
    isTagMode: state.isTagMode,
  };
}

export const ScoreHeaderContainer = connect(
  mapStateToProps,
  null,
)(ScoreHeader);
