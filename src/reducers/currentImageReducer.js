import { SELECT_IMAGE } from '../actions/actionTypes';

export function currentImageReducer(state = null, action) {
  switch (action.type) {
    case SELECT_IMAGE:
      return action.data;
    default:
      return state;
  }
}
