import {
  UPLOADER_SUBMIT_FILE_BEGIN,
  UPLOADER_SUBMIT_FILE_SUCCESS,
  UPLOADER_SUBMIT_FILE_FAILURE,
  UPLOADER_SUBMIT_FILE_DISMISS_ERROR,
} from './constants';
import ApiService from '../../common/_services/api.service';

export function submitFile(file, file_type) {
  return dispatch => {
    dispatch({
      type: UPLOADER_SUBMIT_FILE_BEGIN,
    });

    if (file == null) {
      dispatch({
        type: UPLOADER_SUBMIT_FILE_FAILURE,
        data: { error: 'Error no file submitted!' },
      });
      return;
    }

    const promise = new Promise((resolve, reject) => {
      ApiService.uploadFile(file, file_type).then(
        res => {
          if (res.data.status === 'success') {
            dispatch({
              type: UPLOADER_SUBMIT_FILE_SUCCESS,
              data: {
                file: file,
                res: res.data.result,
              },
            });
          } else {
            dispatch({
              type: UPLOADER_SUBMIT_FILE_FAILURE,
              data: { error: res.data.result },
            });
          }
          resolve(res);
        },
        err => {
          dispatch({
            type: UPLOADER_SUBMIT_FILE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSubmitFileError() {
  return {
    type: UPLOADER_SUBMIT_FILE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case UPLOADER_SUBMIT_FILE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        submitFilePending: true,
        submitFileError: null,
      };

    case UPLOADER_SUBMIT_FILE_SUCCESS:
      // The request is success
      return {
        ...state,
        submitFilePending: false,
        submitFileError: null,
        file: action.data.file,
        result: action.data.res,
      };

    case UPLOADER_SUBMIT_FILE_FAILURE:
      // The request is failed
      return {
        ...state,
        submitFilePending: false,
        submitFileError: action.data.error,
      };

    case UPLOADER_SUBMIT_FILE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        submitFileError: null,
      };

    default:
      return state;
  }
}
