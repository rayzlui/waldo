import { FETCH_TAG_SUCCESS } from '../actions/actionTypes';

export function gameTagsReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_TAG_SUCCESS:
      return action.tags;
    default:
      return state;
  }
}
