import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer', () => {
  const initialState = null;
  const mockThreadId = '1';
  const mockCommentId = '1';
  const mockUserId = 'user1';
  const mockThreadDetail = {
    id: mockThreadId,
    comments: [],
    upVotesBy: [],
    downVotesBy: [],
  };
  const mockComment = {
    id: mockCommentId,
    upVotesBy: [],
    downVotesBy: [],
  };

  it('should return the initial state', () => {
    expect(threadDetailReducer()).toBeNull();
  });

  it('should handle RECEIVE_THREAD_DETAIL action', () => {
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: { threadDetail: mockThreadDetail },
    };
    const newState = threadDetailReducer(initialState, action);
    expect(newState).toEqual(mockThreadDetail);
  });

  it('should handle CLEAR_THREAD_DETAIL action', () => {
    const state = mockThreadDetail;
    const action = { type: ActionType.CLEAR_THREAD_DETAIL };
    const newState = threadDetailReducer(state, action);
    expect(newState).toBeNull();
  });

  it('should handle ADD_THREAD_COMMENT action', () => {
    const state = { ...mockThreadDetail, comments: [] };
    const newComment = mockComment;
    const action = {
      type: ActionType.ADD_THREAD_COMMENT,
      payload: { comment: newComment },
    };
    const newState = threadDetailReducer(state, action);
    expect(newState.comments).toEqual([newComment]);
  });

  it('should handle TOGGLE_VOTE_THREAD_DETAIL action', () => {
    const state = mockThreadDetail;
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD_DETAIL,
      payload: {
        threadId: mockThreadId,
        userId: mockUserId,
        voteType: 1,
      },
    };
    const newState = threadDetailReducer(state, action);
    expect(newState.upVotesBy).toContain(mockUserId);
  });

  it('should handle REVERT_VOTE_THREAD_DETAIL action with previousVoteType 1', () => {
    const state = { ...mockThreadDetail, upVotesBy: [], downVotesBy: [] };
    const action = {
      type: ActionType.REVERT_VOTE_THREAD_DETAIL,
      payload: {
        threadId: mockThreadId,
        userId: mockUserId,
        previousVoteType: 1,
      },
    };
    const newState = threadDetailReducer(state, action);
    expect(newState.upVotesBy).toContain(mockUserId);
    expect(newState.downVotesBy).not.toContain(mockUserId);
  });

  it('should handle REVERT_VOTE_THREAD_DETAIL action with previousVoteType -1', () => {
    const state = { ...mockThreadDetail, upVotesBy: [], downVotesBy: [] };
    const action = {
      type: ActionType.REVERT_VOTE_THREAD_DETAIL,
      payload: {
        threadId: mockThreadId,
        userId: mockUserId,
        previousVoteType: -1,
      },
    };
    const newState = threadDetailReducer(state, action);
    expect(newState.upVotesBy).not.toContain(mockUserId);
    expect(newState.downVotesBy).toContain(mockUserId);
  });

  it('should handle REVERT_VOTE_THREAD_DETAIL action with previousVoteType 0', () => {
    const state = { ...mockThreadDetail, upVotesBy: [], downVotesBy: [] };
    const action = {
      type: ActionType.REVERT_VOTE_THREAD_DETAIL,
      payload: {
        threadId: mockThreadId,
        userId: mockUserId,
        previousVoteType: 0,
      },
    };
    const newState = threadDetailReducer(state, action);
    expect(newState.upVotesBy).not.toContain(mockUserId);
    expect(newState.downVotesBy).not.toContain(mockUserId);
  });
  it('should handle REVERT_VOTE_COMMENT action with previousVoteType 1', () => {
    const state = {
      ...mockThreadDetail,
      comments: [
        {
          ...mockComment,
          id: mockCommentId,
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.REVERT_VOTE_COMMENT,
      payload: {
        commentId: mockCommentId,
        userId: mockUserId,
        previousVoteType: 1,
      },
    };
    const newState = threadDetailReducer(state, action);
    const comment = newState.comments.find((c) => c.id === mockCommentId);
    expect(comment.upVotesBy).toContain(mockUserId);
    expect(comment.downVotesBy).not.toContain(mockUserId);
  });

  it('should handle REVERT_VOTE_COMMENT action with previousVoteType -1', () => {
    const state = {
      ...mockThreadDetail,
      comments: [
        {
          ...mockComment,
          id: mockCommentId,
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.REVERT_VOTE_COMMENT,
      payload: {
        commentId: mockCommentId,
        userId: mockUserId,
        previousVoteType: -1,
      },
    };
    const newState = threadDetailReducer(state, action);
    const comment = newState.comments.find((c) => c.id === mockCommentId);
    expect(comment.upVotesBy).not.toContain(mockUserId);
    expect(comment.downVotesBy).toContain(mockUserId);
  });

  it('should handle REVERT_VOTE_COMMENT action with previousVoteType 0', () => {
    const state = {
      ...mockThreadDetail,
      comments: [
        {
          ...mockComment,
          id: mockCommentId,
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.REVERT_VOTE_COMMENT,
      payload: {
        commentId: mockCommentId,
        userId: mockUserId,
        previousVoteType: 0,
      },
    };
    const newState = threadDetailReducer(state, action);
    const comment = newState.comments.find((c) => c.id === mockCommentId);
    expect(comment.upVotesBy).not.toContain(mockUserId);
    expect(comment.downVotesBy).not.toContain(mockUserId);
  });

  it('should handle unknown actions', () => {
    const state = mockThreadDetail;
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = threadDetailReducer(state, action);
    expect(newState).toEqual(state);
  });
});
