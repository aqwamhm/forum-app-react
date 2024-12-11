import api from "../../utils/api";

const ActionType = {
    RECEIVE_THREADS: "RECEIVE_THREADS",
    CREATE_THREAD: "CREATE_THREAD",
    TOGGLE_VOTE_THREAD: "TOGGLE_VOTE_THREAD",
    REVERT_VOTE_THREAD: "REVERT_VOTE_THREAD",
};

function receiveThreadsActionCreator(threads) {
    return {
        type: ActionType.RECEIVE_THREADS,
        payload: {
            threads,
        },
    };
}

function createThreadActionCreator(thread) {
    return {
        type: ActionType.CREATE_THREAD,
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

function asyncCreateThread({ title, body, category = null }) {
    return async (dispatch) => {
        const thread = await api.createThread({ title, body, category });
        dispatch(createThreadActionCreator(thread));
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
        }
    };
}

export {
    ActionType,
    receiveThreadsActionCreator,
    toggleVoteThreadActionCreator,
    asyncToggleVoteThread,
    asyncCreateThread,
};
