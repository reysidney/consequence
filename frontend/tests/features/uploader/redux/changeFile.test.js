import {
  UPLOADER_CHANGE_FILE,
} from '../../../../src/features/uploader/redux/constants';

import {
  changeFile,
  reducer,
} from '../../../../src/features/uploader/redux/changeFile';

describe('uploader/redux/changeFile', () => {
  it('returns correct action by changeFile', () => {
    expect(changeFile()).toHaveProperty('type', UPLOADER_CHANGE_FILE);
  });

  it('handles action type UPLOADER_CHANGE_FILE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: UPLOADER_CHANGE_FILE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
