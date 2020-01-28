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
} from './typeTypes';

export function retrieveImageIndex() {
  return async function getImages(dispatch) {
    dispatch(startImageFetch());
    let response = await fetch('http://localhost:3001', { mode: 'cors' });
    if (response.status === 200) {
      let data = await response.json();
      dispatch(imageFetchSuccess(data));
    } else {
      const { status, statusText, url } = response;
      const errorInfo = { status, statusText, url };
      dispatch(imageFetchError(errorInfo));
    }
  };
}

export function retrieveTags(id) {
  return async function getTagName(dispatch) {
    dispatch(startTagFetch());
    let response = await fetch(`http://localhost:3001/tags/${id}`, {
      mode: 'cors',
    });
    if (response.status === 200) {
      let tags = await response.json();
      dispatch(tagFetchSuccess(tags));
    } else {
      const { status, statusText, url } = response;
      const errorInfo = { status, statusText, url };
      dispatch(tagFetchError(errorInfo));
    }
  };
}

export function postTags(options) {
  return async function submitTagsToServer(dispatch) {
    dispatch(submitTags());
    let response = fetch('http://localhost:3001', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: options.photoId,
        tags: options.tags,
      }),
    });
    if (response.status === 200) {
      dispatch(submitSuccess());
    } else {
      const { status, statusText, url } = response;
      const errorInfo = { status, statusText, url };
      dispatch(submitError(errorInfo));
    }
  };
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
