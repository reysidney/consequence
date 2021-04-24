import {
  UPLOADER_OPEN_DIALOG,
} from '../../../../src/features/uploader/redux/constants';

import {
  openDialog,
  reducer,
} from '../../../../src/features/uploader/redux/openDialog';

describe('uploader/redux/openDialog', () => {
  it('returns correct action by openDialog', () => {
    expect(openDialog()).toHaveProperty('type', UPLOADER_OPEN_DIALOG);
  });

  it('handles action type UPLOADER_OPEN_DIALOG correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: UPLOADER_OPEN_DIALOG }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
