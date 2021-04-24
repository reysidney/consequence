import {
  LAYER_MINIMIZE_LAYER_DIV,
} from '../../../../src/features/layer/redux/constants';

import {
  minimizeLayerDiv,
  reducer,
} from '../../../../src/features/layer/redux/minimizeLayerDiv';

describe('layer/redux/minimizeLayerDiv', () => {
  it('returns correct action by minimizeLayerDiv', () => {
    expect(minimizeLayerDiv()).toHaveProperty('type', LAYER_MINIMIZE_LAYER_DIV);
  });

  it('handles action type LAYER_MINIMIZE_LAYER_DIV correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: LAYER_MINIMIZE_LAYER_DIV }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
