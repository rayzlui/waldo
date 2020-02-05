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
} from './actionTypes';

export function retrieveImageIndex() {
  return async function getImages(dispatch) {
    dispatch(startImageFetch());
    await fetch('http://localhost:3001', { mode: 'cors' })
      .then(async function(response) {
        if (response.status === 200) {
          let data = await response.json();
          await dispatch(imageFetchSuccess(data));
        } else {
          const { status, statusText, url } = response;
          const errorInfo = { status, statusText, url };
          dispatch(imageFetchError(errorInfo));
        }
      })
      .catch(error => {
        dispatch(imageFetchError(error));
      });
  };
}

export function retrieveAllTags() {
  return async function allDemTags(dispatch) {
    dispatch(startTagFetch());
    await fetch('http://localhost:3001/tags', { mode: 'cors' })
      .then(async function(response) {
        if (response.status === 200) {
          let data = await response.json();
          await dispatch(tagFetchSuccess(data));
        } else {
          const { status, statusText, url } = response;
          const errorInfo = { status, statusText, url };
          dispatch(tagFetchError(errorInfo));
        }
      })
      .catch(error => {
        dispatch(tagFetchError(error));
      });
  };
}

export function retrieveSpecificTags(array) {
  return async function getTagName(dispatch) {
    dispatch(startTagFetch());
    let allTags = {};
    for (let i = 0; i < array.length; i++) {
      let id = array[i][0];
      let key = array[i][1];
      await fetch(`http://localhost:3001/tags/${id}`, {
        mode: 'cors',
      })
        .then(async function(response) {
          if (response.status === 200) {
            let tags = await response.json();
            allTags[key] = tags[0].tag;
          } else {
            const { status, statusText, url } = response;
            const errorInfo = { status, statusText, url };
            dispatch(tagFetchError(errorInfo));
          }
        })
        .catch(function(error) {
          dispatch(tagFetchError(error));
        });
    }
    dispatch(tagFetchSuccess(allTags));
  };
}

export function postTags(options) {
  const { imageId, gridId, value } = options;
  return async function submitTagsToServer(dispatch) {
    dispatch(submitTags());
    await fetch('http://localhost:3001', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageId: imageId,
        gridId: gridId,
        value: value,
      }),
    })
      .then(response => {
        if (response.status === 200) {
          dispatch(submitSuccess());
        } else {
          const { status, statusText, url } = response;
          const errorInfo = { status, statusText, url };
          dispatch(submitError(errorInfo));
        }
      })
      .catch(error => {
        dispatch(submitError(error));
      });
  };
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
