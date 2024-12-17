/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *  - should return the initial state
 *  - should handle SET_AUTH_USER action
 *  - should handle UNSET_AUTH_USER action
 *  - should handle unknown actions
 *
 */

import authUserReducer from './reducer';
import { ActionType } from './action';
import { describe, expect, it } from 'vitest';

describe('authUserReducer', () => {
  const initialState = null;

  it('should return the initial state', () => {
    expect(authUserReducer(initialState, {})).toBeNull();
  });

  it('should handle SET_AUTH_USER action', () => {
    const authUser = { id: 1, username: 'testuser' };
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: { authUser },
    };
    const newState = authUserReducer(initialState, action);
    expect(newState).toEqual(authUser);
  });

  it('should handle UNSET_AUTH_USER action', () => {
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };
    const newState = authUserReducer(initialState, action);
    expect(newState).toBeNull();
  });

  it('should handle unknown actions', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
    };
    const newState = authUserReducer(initialState, action);
    expect(newState).toBeNull();
  });
});
