import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

describe('isPreloadReducer', () => {
  const initialState = true;

  it('should return the initial state', () => {
    const state = isPreloadReducer();
    expect(state).toBe(true);
  });

  it('should handle ActionType.SET_IS_PRELOAD action', () => {
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: { isPreload: false },
    };
    const newState = isPreloadReducer(initialState, action);
    expect(newState).toBe(false);
  });

  it('should handle unknown actions', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
    };
    const newState = isPreloadReducer(initialState, action);
    expect(newState).toBe(true);
  });

  it('should handle ActionType.SET_IS_PRELOAD with different initial state', () => {
    const initialState = false;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: { isPreload: true },
    };
    const newState = isPreloadReducer(initialState, action);
    expect(newState).toBe(true);
  });

  it('should handle ActionType.SET_IS_PRELOAD with missing payload', () => {
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {},
    };
    const newState = isPreloadReducer(initialState, action);
    expect(newState).toBe(undefined);
  });
});
