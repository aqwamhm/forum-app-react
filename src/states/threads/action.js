import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_VOTE_THREAD: 'TOGGLE_VOTE_THREAD',
  REVERT_VOTE_THREAD: 'REVERT_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleVoteThreadActionCreator({ threadId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD,
    payload: {
      threadId,
      userId,
      voteType,
    },
  };
}

function revertVoteThreadActionCreator({ threadId, userId, previousVoteType }) {
  return {
    type: ActionType.REVERT_VOTE_THREAD,
    payload: {
      threadId,
      userId,
      previousVoteType,
    },
  };
}

function asyncReceiveThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getAllThreads();
      dispatch(receiveThreadsActionCreator(threads));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleVoteThread({ threadId, userId, voteType }) {
  return async (dispatch, getState) => {
    const state = getState();
    const currentThread = state.threads.find(
      (thread) => thread.id === threadId
    );
    let previousVoteType = 0;

    if (currentThread) {
      if (currentThread.upVotesBy.includes(userId)) {
        previousVoteType = 1;
      } else if (currentThread.downVotesBy.includes(userId)) {
        previousVoteType = -1;
      }
    }

    dispatch(showLoading());
    dispatch(toggleVoteThreadActionCreator({ threadId, userId, voteType }));

    try {
      if (voteType === 1) {
        await api.upVoteThread(threadId);
      } else if (voteType === -1) {
        await api.downVoteThread(threadId);
      } else if (voteType === 0) {
        await api.neutralizeVoteThread(threadId);
      }
    } catch (error) {
      dispatch(
        revertVoteThreadActionCreator({
          threadId,
          userId,
          previousVoteType,
        })
      );
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleVoteThreadActionCreator,
  revertVoteThreadActionCreator,
  asyncReceiveThreads,
  asyncAddThread,
  asyncToggleVoteThread,
};
