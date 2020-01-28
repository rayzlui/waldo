import { combineReducers } from 'redux';
import { gameTagsReducer } from './gameTagsReducer';
import { imageIndexReducer } from './imageIndexReducer';
import { submitTagsReducer } from './submitTagsReducer';

export const rootReducer = combineReducers({
  index: imageIndexReducer,
  tags: gameTagsReducer,
  submitError: submitTagsReducer,
});
