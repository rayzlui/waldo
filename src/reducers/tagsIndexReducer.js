import {
  SEARCH_TAG_NAME,
  FETCH_TAG_SUCCESS,
  RESET_TAG_SEARCH,
} from '../actions/actionTypes';

const initialState = {
  database: null,
  currentSearch: null,
};

export function tagsIndexReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TAG_SUCCESS:
      let organizedData = action.tags.reduce((acc, curr) => {
        let images = curr.photo_id.map(x => x[0]);
        let name = curr.tag;
        if (acc[name] === undefined) {
          acc[name] = images;
        } else {
          acc[name].concat(images);
        }
        return acc;
      }, {});
      return Object.assign({}, state, { database: organizedData });
    case SEARCH_TAG_NAME:
      let tag = action.tag;
      let imageIds = state.database[tag];
      if (imageIds === undefined) {
        return Object.assign({}, state, { currentSearch: null });
      }
      return Object.assign({}, state, {
        currentSearch: { tag: tag, imageIds: imageIds },
      });

    case RESET_TAG_SEARCH:
      return Object.assign({}, state, { currentSearch: null });
    default:
      return state;
  }
}
