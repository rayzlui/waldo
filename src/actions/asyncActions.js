import {
  startImageFetch,
  imageFetchSuccess,
  imageFetchError,
  startTagFetch,
  tagFetchSuccess,
  tagFetchError,
  submitTags,
  submitSuccess,
  resetCurrentImage,
  submitError,
  updateSuccess,
} from './actions';

export function retrieveImageIndex() {
  return async function getImages(dispatch) {
    dispatch(startImageFetch());
    try {
      let response = await fetch('http://localhost:3001', { mode: 'cors' });

      if (response.status === 200) {
        let data = await response.json();
        await dispatch(imageFetchSuccess(data));
      } else {
        const { status, statusText, url } = response;
        const errorInfo = { status, statusText, url };
        dispatch(imageFetchError(errorInfo));
      }
    } catch (error) {
      dispatch(imageFetchError(error));
    }
  };
}

export function retrieveAllTags() {
  return async function allDemTags(dispatch) {
    dispatch(startTagFetch());

    try {
      let response = await fetch('http://localhost:3001/tags', {
        mode: 'cors',
      });
      if (response.status === 200) {
        let data = await response.json();
        dispatch(tagFetchSuccess(data));
      } else {
        const { status, statusText, url } = response;
        const errorInfo = { status, statusText, url };
        dispatch(tagFetchError(errorInfo));
      }
    } catch (error) {
      dispatch(tagFetchError(error));
    }
  };
}

export function retrieveSpecificTags(array) {
  return async function getTagName(dispatch) {
    dispatch(startTagFetch());
    let allTags = {};
    for (let i = 0; i < array.length; i++) {
      let id = array[i][0];
      let key = array[i][1];
      try {
        let response = await fetch(`http://localhost:3001/tags/${id}`, {
          mode: 'cors',
        });
        if (response.status === 200) {
          let tags = await response.json();
          allTags[key] = tags[0].tag;
        } else {
          const { status, statusText, url } = response;
          const errorInfo = { status, statusText, url };
          dispatch(tagFetchError(errorInfo));
        }
      } catch (error) {
        dispatch(tagFetchError(error));
      }
    }
    dispatch(tagFetchSuccess(allTags));
  };
}

export function postTags(options) {
  const { imageId, gridId, value } = options;
  return async function submitTagsToServer(dispatch) {
    dispatch(submitTags());
    try {
      let response = await fetch('http://localhost:3001/tags', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageId: imageId,
          gridId: gridId,
          value: value,
        }),
      });
      if (response.status === 200) {
        let data = await response.json();
        dispatch(submitSuccess());
        dispatch(tagFetchSuccess(data.tags));
        dispatch(imageFetchSuccess(data.images));
        dispatch(resetCurrentImage(data.images.find(x => x.key === imageId)));
      } else {
        const { status, statusText, url } = response;
        const errorInfo = { status, statusText, url };
        dispatch(submitError(errorInfo));
      }
    } catch (error) {
      dispatch(submitError(error));
    }
  };
}

export function overrideTags(tagId, imageKey, gridId) {
  return async function removeTags(dispatch) {
    try {
      await fetch(`http://localhost:3001/tags/${tagId}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageKey,
          gridId,
        }),
      });
    } catch (error) {
      dispatch(submitError(error));
    }
  };
}

export function submitNewImage(key, url) {
  return async function submitImageToServer(dispatch) {
    try {
      let response = await fetch('http://localhost:3001/photos', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: key,
          newUrl: url,
        }),
      });
      if (response.status === 200) {
        dispatch(submitSuccess());
      } else {
        const { status, statusText, url } = response;
        const errorInfo = { status, statusText, url };
        dispatch(submitError(errorInfo));
      }
    } catch (error) {
      dispatch(submitError(error));
    }
  };
}

export function editImage(options) {
  const { id, url } = options;
  return async function submitImageToServer(dispatch) {
    try {
      let response = await fetch(`http://localhost:3001/photos/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newUrl: url,
        }),
      });

      if (response.status === 200) {
        let data = await response.json();
        dispatch(updateSuccess(data));
        dispatch(retrieveImageIndex());
        dispatch(retrieveAllTags());
      } else {
        const { status, statusText, url } = response;
        const errorInfo = { status, statusText, url };
        dispatch(submitError(errorInfo));
      }
    } catch (error) {
      dispatch(submitError(error));
    }
  };
}

export function deleteImage(key) {
  return async function deleteThisImage(dispatch) {
    try {
      let response = await fetch(`http://localhost:3001/photos/${key}`, {
        method: 'delete',
      });
      if (response.status === 200) {
        dispatch(updateSuccess(null));
        dispatch(retrieveImageIndex());
        dispatch(retrieveAllTags());
      } else {
        const { status, statusText, url } = response;
        const errorInfo = { status, statusText, url };
        dispatch(submitError(errorInfo));
      }
    } catch (error) {
      dispatch(submitError(error));
    }
  };
}
