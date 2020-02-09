import { RESET_GRID, CHANGE_GRID } from '../actions/actionTypes';

export function currentGridReducer(state = null, action) {
  switch (action.type) {
    case CHANGE_GRID:
      return action.gridId;
    case RESET_GRID:
      return null;
    default:
      return state;
  }
}
