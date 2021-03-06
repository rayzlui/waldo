import {
  SUBMIT_TAGS_ERROR,
  SUBMIT_TAGS_SUCCESS,
  RESET_ERROR,
} from '../actions/actionTypes';

export function submitTagsReducer(state = null, action) {
  switch (action.type) {
    case SUBMIT_TAGS_ERROR:
      return false;
    case SUBMIT_TAGS_SUCCESS:
      return true;
    case RESET_ERROR:
    default:
      return null;
  }
}
