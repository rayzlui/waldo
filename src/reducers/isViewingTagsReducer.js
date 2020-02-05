import { VIEW_IMAGE, VIEW_TAGS } from '../actions/actionTypes';

export function isViewingTagsReducer(state = false, action) {
  switch (action.type) {
    case VIEW_IMAGE:
      return false;
    case VIEW_TAGS:
      return true;
    default:
      return state;
  }
}
