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
  viewTags,
  viewImage,
  resetTagSearch,
  resetCurrentImage,
  updateSuccess,
  changeGrid,
  selectImage,
  imageFetchSuccess,
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
  VIEW_TAGS,
  VIEW_IMAGE,
  RESET_TAG_SEARCH,
  RESET_CURRENT_IMAGE,
  UPDATE_SUCCESS,
  CHANGE_GRID,
  SELECT_IMAGE,
  FETCH_IMAGE_SUCCESS,
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
basicActionTestHelper(viewTags, VIEW_TAGS);
basicActionTestHelper(viewImage, VIEW_IMAGE);
basicActionTestHelper(resetTagSearch, RESET_TAG_SEARCH);

function parameterActionTestHelper(action, actionType, key, input) {
  return describe(`${action.name}`, () => {
    it(`should return { type: ${actionType} ${key}: ${input}}`, () => {
      let wrapper = action(input);
      expect(wrapper.type).toEqual(actionType);
      expect(wrapper[key]).toEqual(input);
    });
  });
}

let mockData = {
  tags: [
    ['5e2b8a7f053daa085dfd6904', '17'],
    ['5cb6c63f4a885951900ae0fd', '19'],
    ['5e2b8a7f053daa085dfd6905', '22'],
    ['5e2b8a7f053daa085dfd6906', '34'],
  ],
  _id: '5cb6c6094f41f3516e2fc4f4',
  key: 2,
  photo:
    'https://www.muraldecal.com/en/img/fomi030_1-jpg/folder/products-detalle-muestras-grandes/wall-murals-minions.jpg',
  __v: 2,
};
parameterActionTestHelper(
  resetCurrentImage,
  RESET_CURRENT_IMAGE,
  'image',
  mockData,
);

parameterActionTestHelper(updateSuccess, UPDATE_SUCCESS, 'data', mockData);
parameterActionTestHelper(changeGrid, CHANGE_GRID, 'gridId', 9);
parameterActionTestHelper(selectImage, SELECT_IMAGE, 'data', mockData);
parameterActionTestHelper(
  imageFetchSuccess,
  FETCH_IMAGE_SUCCESS,
  'data',
  mockData,
);
