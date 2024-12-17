import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer', () => {
  const initialThreads = [];
  const thread1 = { id: '1', upVotesBy: [], downVotesBy: [] };
  const thread2 = { id: '2', upVotesBy: [], downVotesBy: [] };
  const stateWithThreads = [thread1, thread2];

  it('should return the initial state', () => {
    expect(threadsReducer()).toEqual([]);
  });

  it('should handle ActionType.RECEIVE_THREADS action', () => {
    const receivedThreads = [thread1, thread2];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: { threads: receivedThreads },
    };
    const newState = threadsReducer(initialThreads, action);
    expect(newState).toEqual(receivedThreads);
  });

  it('should handle ActionType.TOGGLE_VOTE_THREAD action - Upvote', () => {
    const state = [...stateWithThreads];
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: { threadId: '1', userId: 'user1', voteType: 1 },
    };
    const newState = threadsReducer(state, action);
    expect(newState[0].upVotesBy).toContain('user1');
    expect(newState[0].downVotesBy).not.toContain('user1');
    expect(newState[1]).toEqual(thread2);
  });

  it('should handle ActionType.TOGGLE_VOTE_THREAD action - Downvote', () => {
    const state = [{ ...thread1, upVotesBy: ['user1'] }, thread2];
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: { threadId: '1', userId: 'user1', voteType: -1 },
    };
    const newState = threadsReducer(state, action);
    expect(newState[0].downVotesBy).toContain('user1');
    expect(newState[0].upVotesBy).not.toContain('user1');
    expect(newState[1]).toEqual(thread2);
  });

  it('should handle ActionType.REVERT_VOTE_THREAD action - Previous Vote Type 1', () => {
    const state = [{ ...thread1, upVotesBy: [], downVotesBy: [] }, thread2];
    const action = {
      type: ActionType.REVERT_VOTE_THREAD,
      payload: { threadId: '1', userId: 'user1', previousVoteType: 1 },
    };
    const newState = threadsReducer(state, action);
    expect(newState[0].upVotesBy).toContain('user1');
    expect(newState[0].downVotesBy).toEqual(thread1.downVotesBy);
    expect(newState[1]).toEqual(thread2);
  });

  it('should handle ActionType.REVERT_VOTE_THREAD action - Previous Vote Type -1', () => {
    const state = [{ ...thread1, upVotesBy: [], downVotesBy: [] }, thread2];
    const action = {
      type: ActionType.REVERT_VOTE_THREAD,
      payload: { threadId: '1', userId: 'user1', previousVoteType: -1 },
    };
    const newState = threadsReducer(state, action);
    expect(newState[0].downVotesBy).toContain('user1');
    expect(newState[0].upVotesBy).toEqual(thread1.upVotesBy);
    expect(newState[1]).toEqual(thread2);
  });

  it('should handle ActionType.REVERT_VOTE_THREAD action - Previous Vote Type 0', () => {
    const state = [...stateWithThreads];
    const action = {
      type: ActionType.REVERT_VOTE_THREAD,
      payload: { threadId: '1', userId: 'user1', previousVoteType: 0 },
    };
    const newState = threadsReducer(state, action);
    expect(newState[0].upVotesBy).not.toContain('user1');
    expect(newState[0].downVotesBy).not.toContain('user1');
    expect(newState[1]).toEqual(thread2);
  });

  it('should handle unknown actions', () => {
    const state = [...stateWithThreads];
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = threadsReducer(state, action);
    expect(newState).toEqual(state);
  });

  it('should handle ActionType.TOGGLE_VOTE_THREAD action - Non-existent Thread ID', () => {
    const state = [...stateWithThreads];
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: { threadId: '3', userId: 'user1', voteType: 1 },
    };
    const newState = threadsReducer(state, action);
    expect(newState).toEqual(state);
  });

  it('should handle ActionType.REVERT_VOTE_THREAD action - Non-existent Thread ID', () => {
    const state = [...stateWithThreads];
    const action = {
      type: ActionType.REVERT_VOTE_THREAD,
      payload: { threadId: '3', userId: 'user1', previousVoteType: 1 },
    };
    const newState = threadsReducer(state, action);
    expect(newState).toEqual(state);
  });

  it('should handle ActionType.TOGGLE_VOTE_THREAD action - Empty upVotesBy and downVotesBy', () => {
    const state = [...stateWithThreads];
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: { threadId: '1', userId: 'user1', voteType: 1 },
    };
    const newState = threadsReducer(state, action);
    expect(newState[0].upVotesBy).toContain('user1');
    expect(newState[0].downVotesBy).toEqual([]);
    expect(newState[1]).toEqual(thread2);
  });

  it('should handle ActionType.REVERT_VOTE_THREAD action - User Not in upVotesBy or downVotesBy', () => {
    const state = [...stateWithThreads];
    const action = {
      type: ActionType.REVERT_VOTE_THREAD,
      payload: { threadId: '1', userId: 'user1', previousVoteType: 0 },
    };
    const newState = threadsReducer(state, action);
    expect(newState[0].upVotesBy).toEqual([]);
    expect(newState[0].downVotesBy).toEqual([]);
    expect(newState[1]).toEqual(thread2);
  });

  it('should ensure immutability when updating state', () => {
    const state = [...stateWithThreads];
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: { threadId: '1', userId: 'user1', voteType: 1 },
    };
    const newState = threadsReducer(state, action);
    expect(newState).not.toBe(state);
    expect(newState[1]).toBe(thread2);
    expect(newState[0]).not.toBe(thread1);
  });
});
