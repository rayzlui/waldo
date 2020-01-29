import { RESET_SCORE, UPDATE_SCORE } from '../actions/actionTypes';

export function gameScoreReducer(state = 0, action) {
  switch (action.type) {
    case RESET_SCORE:
      return 0;
    case UPDATE_SCORE:
      return state + 1;
    default:
      return state;
  }
}
