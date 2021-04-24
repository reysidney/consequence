import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  UPLOADER_SUBMIT_FILE_BEGIN,
  UPLOADER_SUBMIT_FILE_SUCCESS,
  UPLOADER_SUBMIT_FILE_FAILURE,
  UPLOADER_SUBMIT_FILE_DISMISS_ERROR,
} from '../../../../src/features/uploader/redux/constants';

import {
  submitFile,
  dismissSubmitFileError,
  reducer,
} from '../../../../src/features/uploader/redux/submitFile';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('uploader/redux/submitFile', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when submitFile succeeds', () => {
    const store = mockStore({});

    return store.dispatch(submitFile())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', UPLOADER_SUBMIT_FILE_BEGIN);
        expect(actions[1]).toHaveProperty('type', UPLOADER_SUBMIT_FILE_SUCCESS);
      });
  });

  it('dispatches failure action when submitFile fails', () => {
    const store = mockStore({});

    return store.dispatch(submitFile({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', UPLOADER_SUBMIT_FILE_BEGIN);
        expect(actions[1]).toHaveProperty('type', UPLOADER_SUBMIT_FILE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSubmitFileError', () => {
    const expectedAction = {
      type: UPLOADER_SUBMIT_FILE_DISMISS_ERROR,
    };
    expect(dismissSubmitFileError()).toEqual(expectedAction);
  });

  it('handles action type UPLOADER_SUBMIT_FILE_BEGIN correctly', () => {
    const prevState = { submitFilePending: false };
    const state = reducer(
      prevState,
      { type: UPLOADER_SUBMIT_FILE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitFilePending).toBe(true);
  });

  it('handles action type UPLOADER_SUBMIT_FILE_SUCCESS correctly', () => {
    const prevState = { submitFilePending: true };
    const state = reducer(
      prevState,
      { type: UPLOADER_SUBMIT_FILE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitFilePending).toBe(false);
  });

  it('handles action type UPLOADER_SUBMIT_FILE_FAILURE correctly', () => {
    const prevState = { submitFilePending: true };
    const state = reducer(
      prevState,
      { type: UPLOADER_SUBMIT_FILE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitFilePending).toBe(false);
    expect(state.submitFileError).toEqual(expect.anything());
  });

  it('handles action type UPLOADER_SUBMIT_FILE_DISMISS_ERROR correctly', () => {
    const prevState = { submitFileError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: UPLOADER_SUBMIT_FILE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitFileError).toBe(null);
  });
});

