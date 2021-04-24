// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { LAYER_ADD_LAYER } from './constants';

export function addLayer(layer) {
  return {
    type: LAYER_ADD_LAYER,
    data: { layer: layer },
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LAYER_ADD_LAYER:
      return {
        ...state,
        layers: [...state.layers, action.data.layer],
      };

    default:
      return state;
  }
}
