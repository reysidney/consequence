import {
  LAYER_UPDATE_LAYER,
} from '../../../../src/features/layer/redux/constants';

import {
  updateLayer,
  reducer,
} from '../../../../src/features/layer/redux/updateLayer';

describe('layer/redux/updateLayer', () => {
  it('returns correct action by updateLayer', () => {
    expect(updateLayer()).toHaveProperty('type', LAYER_UPDATE_LAYER);
  });

  it('handles action type LAYER_UPDATE_LAYER correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: LAYER_UPDATE_LAYER }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
