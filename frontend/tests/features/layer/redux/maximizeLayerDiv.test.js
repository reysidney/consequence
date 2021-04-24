import {
  LAYER_MAXIMIZE_LAYER_DIV,
} from '../../../../src/features/layer/redux/constants';

import {
  maximizeLayerDiv,
  reducer,
} from '../../../../src/features/layer/redux/maximizeLayerDiv';

describe('layer/redux/maximizeLayerDiv', () => {
  it('returns correct action by maximizeLayerDiv', () => {
    expect(maximizeLayerDiv()).toHaveProperty('type', LAYER_MAXIMIZE_LAYER_DIV);
  });

  it('handles action type LAYER_MAXIMIZE_LAYER_DIV correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: LAYER_MAXIMIZE_LAYER_DIV }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
