import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;
  case ActionType.TOGGLE_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        const { userId, voteType } = action.payload;
        let upVotesBy = [...thread.upVotesBy];
        let downVotesBy = [...thread.downVotesBy];

        if (thread.upVotesBy.includes(userId)) {
          upVotesBy = upVotesBy.filter((id) => id !== userId);
        }
        if (thread.downVotesBy.includes(userId)) {
          downVotesBy = downVotesBy.filter((id) => id !== userId);
        }

        if (voteType === 1) {
          upVotesBy.push(userId);
        } else if (voteType === -1) {
          downVotesBy.push(userId);
        }

        return {
          ...thread,
          upVotesBy,
          downVotesBy,
        };
      }
      return thread;
    });
  case ActionType.REVERT_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        const { userId, previousVoteType } = action.payload;
        let upVotesBy = [...thread.upVotesBy];
        let downVotesBy = [...thread.downVotesBy];

        if (previousVoteType === 1) {
          upVotesBy.push(userId);
          downVotesBy = downVotesBy.filter((id) => id !== userId);
        } else if (previousVoteType === -1) {
          downVotesBy.push(userId);
          upVotesBy = upVotesBy.filter((id) => id !== userId);
        } else {
          upVotesBy = upVotesBy.filter((id) => id !== userId);
          downVotesBy = downVotesBy.filter((id) => id !== userId);
        }

        return {
          ...thread,
          upVotesBy,
          downVotesBy,
        };
      }
      return thread;
    });
  default:
    return threads;
  }
}

export default threadsReducer;
