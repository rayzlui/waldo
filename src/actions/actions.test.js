import {
  savingImageStart,
  resetGrid,
  toggleMode,
  updateScore,
  resetScore,
  resetError,
  startImageFetch,
  startTagFetch,
  submitTags,
  submitSuccess,
  submitError,
  viewTags,
  viewImage,
} from './actions';
import {
  SAVING_IMAGE_START,
  RESET_GRID,
  TOGGLE_MODE,
  UPDATE_SCORE,
  RESET_SCORE,
  RESET_ERROR,
  START_FETCHING_IMAGE,
  START_FETCH_TAGS,
  SUBMIT_TAGS_START,
  SUBMIT_TAGS_SUCCESS,
  SUBMIT_TAGS_ERROR,
  VIEW_TAGS,
  VIEW_IMAGE,
} from './actionTypes';

function basicActionTestHelper(action, actionType) {
  return describe(`${action.name}`, () => {
    it(`should return { type: ${actionType} }`, () => {
      expect(action()).toEqual({ type: actionType });
    });
  });
}

basicActionTestHelper(savingImageStart, SAVING_IMAGE_START);
basicActionTestHelper(resetGrid, RESET_GRID);
basicActionTestHelper(toggleMode, TOGGLE_MODE);
basicActionTestHelper(updateScore, UPDATE_SCORE);
basicActionTestHelper(resetScore, RESET_SCORE);
basicActionTestHelper(resetError, RESET_ERROR);
basicActionTestHelper(startImageFetch, START_FETCHING_IMAGE);
basicActionTestHelper(startTagFetch, START_FETCH_TAGS);
basicActionTestHelper(submitTags, SUBMIT_TAGS_START);
basicActionTestHelper(submitSuccess, SUBMIT_TAGS_SUCCESS);
basicActionTestHelper(submitError, SUBMIT_TAGS_ERROR);
basicActionTestHelper(viewTags, VIEW_TAGS);
basicActionTestHelper(viewImage, VIEW_IMAGE)