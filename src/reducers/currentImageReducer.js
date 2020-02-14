import {
  SELECT_IMAGE,
  UPDATE_SUCCESS,
  VIEW_TAGS,
} from '../actions/actionTypes';

export function currentImageReducer(state = null, action) {
  switch (action.type) {
    case SELECT_IMAGE:
      return action.data;
    case UPDATE_SUCCESS:
      return action.data;
    case VIEW_TAGS:
      return null;
    default:
      return state;
  }
}
