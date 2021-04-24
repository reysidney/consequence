import {
  HOME_HANDLE_DROP_BEGIN,
  HOME_HANDLE_DROP_SUCCESS,
  HOME_HANDLE_DROP_FAILURE,
  HOME_HANDLE_DROP_DISMISS_ERROR,
} from './constants';
import ApiService from '../../common/_services/api.service';

export function handleDrop(file, file_type) {
  return dispatch => {
    dispatch({
      type: HOME_HANDLE_DROP_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      ApiService.uploadFile(file, file_type).then(
        res => {
          if (res.data.status === 'success') {
            dispatch({
              type: HOME_HANDLE_DROP_SUCCESS,
              data: {
                file: file,
                res: res.data.result,
              },
            });
          } else {
            dispatch({
              type: HOME_HANDLE_DROP_FAILURE,
              data: { error: res.data.result },
            });
          }
          resolve(res);
        },
        err => {
          dispatch({
            type: HOME_HANDLE_DROP_FAILURE,
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
export function dismissHandleDropError() {
  return {
    type: HOME_HANDLE_DROP_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_HANDLE_DROP_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        handleDropPending: true,
        handleDropError: null,
      };

    case HOME_HANDLE_DROP_SUCCESS:
      // The request is success
      return {
        ...state,
        handleDropPending: false,
        handleDropError: null,
        file: action.data.file,
        result: action.data.res,
      };

    case HOME_HANDLE_DROP_FAILURE:
      // The request is failed
      return {
        ...state,
        handleDropPending: false,
        handleDropError: action.data.error,
      };

    case HOME_HANDLE_DROP_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        handleDropError: null,
      };

    default:
      return state;
  }
}
