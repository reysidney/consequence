import {
  LAYER_ADD_LAYER,
} from '../../../../src/features/layer/redux/constants';

import {
  addLayer,
  reducer,
} from '../../../../src/features/layer/redux/addLayer';

describe('layer/redux/addLayer', () => {
  it('returns correct action by addLayer', () => {
    expect(addLayer()).toHaveProperty('type', LAYER_ADD_LAYER);
  });

  it('handles action type LAYER_ADD_LAYER correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: LAYER_ADD_LAYER }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
