import { connect } from 'react-redux';
import { ScoreCard } from '../views/ScoreView';

function mapStateToProps(state) {
  return { isTagMode: state.isTagMode, score: state.gameScore };
}

export const ScoreContainer = connect(
  mapStateToProps,
  null,
)(ScoreCard);
