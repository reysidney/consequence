// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { UPLOADER_OPEN_DIALOG } from './constants';

export function openDialog(ext) {
  return {
    type: UPLOADER_OPEN_DIALOG,
    ext: ext,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case UPLOADER_OPEN_DIALOG:
      return {
        ...state,
        showDialog: true,
        ext: action.ext,
      };

    default:
      return state;
  }
}
