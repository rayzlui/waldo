import {
  START_FETCHING_IMAGE,
  FETCHING_IMAGE_ERROR,
  START_FETCH_TAGS,
  FETCHING_TAGS_ERROR,
  SUBMIT_TAGS_START,
  SUBMIT_TAGS_SUCCESS,
  SUBMIT_TAGS_ERROR,
  FETCH_IMAGE_SUCCESS,
  FETCH_TAG_SUCCESS,
  TOGGLE_MODE,
  SELECT_IMAGE,
  UPDATE_SCORE,
  RESET_SCORE,
  RESET_GRID,
  CHANGE_GRID,
  RESET_ERROR,
  VIEW_TAGS,
  VIEW_IMAGE,
  SEARCH_TAG_NAME,
  RESET_TAG_SEARCH,
  SAVING_IMAGE_START,
  UPDATE_SUCCESS,
  RESET_CURRENT_IMAGE,
} from './actionTypes';

export function resetCurrentImage(image) {
  return { type: RESET_CURRENT_IMAGE, image: image };
}

export function updateSuccess(data) {
  return { type: UPDATE_SUCCESS, data: data };
}

export function savingImageStart() {
  return { type: SAVING_IMAGE_START };
}

export function resetGrid() {
  return { type: RESET_GRID };
}

export function changeGrid(id) {
  return { type: CHANGE_GRID, gridId: id };
}

export function toggleMode() {
  return { type: TOGGLE_MODE };
}

export function updateScore() {
  return { type: UPDATE_SCORE };
}

export function resetScore() {
  return { type: RESET_SCORE };
}

export function resetError() {
  return { type: RESET_ERROR };
}

export function selectImage(data) {
  return { type: SELECT_IMAGE, data: data };
}

export function startImageFetch() {
  return { type: START_FETCHING_IMAGE };
}

export function imageFetchSuccess(data) {
  return { type: FETCH_IMAGE_SUCCESS, data: data };
}

export function imageFetchError(error) {
  return { type: FETCHING_IMAGE_ERROR, error: error };
}

export function startTagFetch() {
  return { type: START_FETCH_TAGS };
}

export function tagFetchSuccess(tags) {
  return { type: FETCH_TAG_SUCCESS, tags: tags };
}

export function tagFetchError(err) {
  return { type: FETCHING_TAGS_ERROR, err: err };
}

export function submitTags() {
  return { type: SUBMIT_TAGS_START };
}

export function submitSuccess() {
  return { type: SUBMIT_TAGS_SUCCESS };
}

export function submitError(err) {
  return { type: SUBMIT_TAGS_ERROR, err: err };
}

export function viewTags() {
  return { type: VIEW_TAGS };
}

export function viewImage() {
  return { type: VIEW_IMAGE };
}

export function resetTagSearch() {
  return { type: RESET_TAG_SEARCH };
}
export function searchTagNames(tag) {
  return { type: SEARCH_TAG_NAME, tag: tag };
}
