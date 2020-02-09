import { FETCH_TAG_SUCCESS } from '../actions/actionTypes';

export function gameTagsReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_TAG_SUCCESS:
      let organizedData = action.tags.reduce((acc, curr) => {
        let key = curr._id;
        let name = curr.tag;
        acc[key] = name;
        return acc;
      }, {});
      return organizedData;
    default:
      return state;
  }
}
