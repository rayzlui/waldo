import { connect } from 'react-redux';
import { ScoreHeader } from './ScoreHeaderView';

function mapStateToProps(state) {
  return {
    isTagMode: state.isTagMode,
  };
}

export const ScoreHeaderContainer = connect(mapStateToProps)(ScoreHeader);
