import { combineReducers } from 'redux';
import { gameTagsReducer } from './gameTagsReducer';
import { imageIndexReducer } from './imageIndexReducer';
import { submitTagsReducer } from './submitTagsReducer';
import { currentImageReducer } from './currentImageReducer';
import { isTagModeReducer } from './isTagModeReducer';
import { gameScoreReducer } from './gameScoreReducer';
import { networkErrorReducer } from './networkErrorReducer';
import { currentGridReducer } from './currentGridReducer';
import { tagsIndexReducer } from './tagsIndexReducer';
import { isViewingTagsReducer } from './isViewingTagsReducer';

export const rootReducer = combineReducers({
  error: networkErrorReducer,
  index: imageIndexReducer,
  tags: gameTagsReducer,
  submitError: submitTagsReducer,
  currentImage: currentImageReducer,
  isTagMode: isTagModeReducer,
  gameScore: gameScoreReducer,
  currentGrid: currentGridReducer,
  isViewingTags: isViewingTagsReducer,
  searchedTag: tagsIndexReducer,
});
