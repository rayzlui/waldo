import {
  FETCH_IMAGE_SUCCESS,
  FETCHING_IMAGE_ERROR,
} from '../actions/actionTypes';

export function networkErrorReducer(state = null, action) {
  switch (action.type) {
    case FETCHING_IMAGE_ERROR:
      return true;
    case FETCH_IMAGE_SUCCESS:
      return false;
    default:
      return state;
  }
}
