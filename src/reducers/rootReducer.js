import { combineReducers } from 'redux';
import { gameTagsReducer } from './gameTagsReducer';
import { imageIndexReducer } from './imageIndexReducer';
import { submitTagsReducer } from './submitTagsReducer';
import { currentImageReducer } from './currentImageReducer';
import { isTagModeReducer } from './isTagModeReducer';
import { gameScoreReducer } from './gameScoreReducer';
import { networkErrorReducer } from './networkErrorReducer';
import { currentGridReducer } from './currentGridReducer';

export const rootReducer = combineReducers({
  error: networkErrorReducer,
  index: imageIndexReducer,
  tags: gameTagsReducer,
  submitError: submitTagsReducer,
  currentImage: currentImageReducer,
  isTagMode: isTagModeReducer,
  gameScore: gameScoreReducer,
  currentGrid: currentGridReducer,
  isViewingTags: isTagModeReducer,
});
