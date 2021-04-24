// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { UPLOADER_CHANGE_FILE } from './constants';

export function changeFile(file, file_type) {
  return {
    type: UPLOADER_CHANGE_FILE,
    file: file,
    file_type: file_type,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case UPLOADER_CHANGE_FILE:
      return {
        ...state,
        file: action.file,
        file_type: action.file_type,
      };

    default:
      return state;
  }
}
