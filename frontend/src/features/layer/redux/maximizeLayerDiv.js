// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { LAYER_MAXIMIZE_LAYER_DIV } from './constants';

export function maximizeLayerDiv() {
  return {
    type: LAYER_MAXIMIZE_LAYER_DIV,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LAYER_MAXIMIZE_LAYER_DIV:
      return {
        ...state,
        closeLayerDiv: false,
      };

    default:
      return state;
  }
}
