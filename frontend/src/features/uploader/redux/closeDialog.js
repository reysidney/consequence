// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { UPLOADER_CLOSE_DIALOG } from './constants';

export function closeDialog() {
  return {
    type: UPLOADER_CLOSE_DIALOG,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case UPLOADER_CLOSE_DIALOG:
      return {
        ...state,
        showDialog: false,
        ext: null,
        file: null,
        file_type: null,
      };

    default:
      return state;
  }
}
