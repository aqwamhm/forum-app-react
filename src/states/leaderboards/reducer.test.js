/**
 * test scenario for leaderboardsReducer
 *
 * - leaderboardsReducer function
 *  - should return the initial state when no state or action is provided
 *  - should handle ActionType.RECEIVE_LEADERBOARDS action
 *  - should handle unknown actions
 *  - should handle ActionType.RECEIVE_LEADERBOARDS with missing leaderboards in payload
 *  - should maintain state with existing leaderboards on unknown action
 *  - should ensure immutability when updating state
 *
 */

import { describe, it, expect } from 'vitest';
import leaderboardsReducer from './reducer';
import { ActionType } from './action';

describe('leaderboardsReducer', () => {
  const initialState = [];

  it('should return the initial state when no state or action is provided', () => {
    const state = leaderboardsReducer();
    expect(state).toEqual([]);
  });

  it('should handle ActionType.RECEIVE_LEADERBOARDS action', () => {
    const sampleLeaderboards = [
      { id: 1, name: 'Player 1' },
      { id: 2, name: 'Player 2' },
    ];
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: { leaderboards: sampleLeaderboards },
    };
    const newState = leaderboardsReducer(initialState, action);
    expect(newState).toEqual(sampleLeaderboards);
    expect(newState).not.toBe(initialState); // Check for immutability
  });

  it('should handle unknown actions', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const newState = leaderboardsReducer(initialState, unknownAction);
    expect(newState).toEqual(initialState);
  });

  it('should handle ActionType.RECEIVE_LEADERBOARDS with missing leaderboards in payload', () => {
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {},
    };
    const newState = leaderboardsReducer(initialState, action);
    expect(newState).toBeUndefined();
  });

  it('should maintain state with existing leaderboards on unknown action', () => {
    const initialLeaderboards = [{ id: 1, name: 'Player 1' }];
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const newState = leaderboardsReducer(
      initialLeaderboards,
      unknownAction
    );
    expect(newState).toEqual(initialLeaderboards);
  });

  it('should ensure immutability when updating state', () => {
    const sampleLeaderboards = [
      { id: 1, name: 'Player 1' },
      { id: 2, name: 'Player 2' },
    ];
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: { leaderboards: sampleLeaderboards },
    };
    const newState = leaderboardsReducer(initialState, action);
    expect(newState).not.toBe(initialState);
  });
});
