import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_HANDLE_DROP_BEGIN,
  HOME_HANDLE_DROP_SUCCESS,
  HOME_HANDLE_DROP_FAILURE,
  HOME_HANDLE_DROP_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  handleDrop,
  dismissHandleDropError,
  reducer,
} from '../../../../src/features/home/redux/handleDrop';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/handleDrop', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when handleDrop succeeds', () => {
    const store = mockStore({});

    return store.dispatch(handleDrop())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_HANDLE_DROP_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_HANDLE_DROP_SUCCESS);
      });
  });

  it('dispatches failure action when handleDrop fails', () => {
    const store = mockStore({});

    return store.dispatch(handleDrop({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_HANDLE_DROP_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_HANDLE_DROP_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissHandleDropError', () => {
    const expectedAction = {
      type: HOME_HANDLE_DROP_DISMISS_ERROR,
    };
    expect(dismissHandleDropError()).toEqual(expectedAction);
  });

  it('handles action type HOME_HANDLE_DROP_BEGIN correctly', () => {
    const prevState = { handleDropPending: false };
    const state = reducer(
      prevState,
      { type: HOME_HANDLE_DROP_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.handleDropPending).toBe(true);
  });

  it('handles action type HOME_HANDLE_DROP_SUCCESS correctly', () => {
    const prevState = { handleDropPending: true };
    const state = reducer(
      prevState,
      { type: HOME_HANDLE_DROP_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.handleDropPending).toBe(false);
  });

  it('handles action type HOME_HANDLE_DROP_FAILURE correctly', () => {
    const prevState = { handleDropPending: true };
    const state = reducer(
      prevState,
      { type: HOME_HANDLE_DROP_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.handleDropPending).toBe(false);
    expect(state.handleDropError).toEqual(expect.anything());
  });

  it('handles action type HOME_HANDLE_DROP_DISMISS_ERROR correctly', () => {
    const prevState = { handleDropError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_HANDLE_DROP_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.handleDropError).toBe(null);
  });
});

