// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { LAYER_UPDATE_LAYER } from './constants';

export function updateLayer(layerIndex, layer) {
  return {
    type: LAYER_UPDATE_LAYER,
    data: { layerIndex: layerIndex, layer: layer },
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LAYER_UPDATE_LAYER:
      return {
        ...state,
        layers: state.layers.map((item, key) => {
          if (key === action.layerIndex) {
            return action.layer;
          } else {
            return item;
          }
        }),
      };

    default:
      return state;
  }
}
