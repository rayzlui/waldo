import { TOGGLE_MODE } from '../actions/actionTypes';

export function isTagModeReducer(state = true, action) {
  switch (action.type) {
    case TOGGLE_MODE:
      return !state;
    default:
      return state;
  }
}
