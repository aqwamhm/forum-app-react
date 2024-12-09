import api from "../../utils/api";

const ActionType = {
    RECEIVE_THREADS: "RECEIVE_THREADS",
    CREATE_THREAD: "CREATE_THREAD",
    UP_VOTE_THREAD: "UP_VOTE_THREAD",
    DOWN_VOTE_THREAD: "DOWN_VOTE_THREAD",
    NEUTRALIZE_VOTE_THREAD: "NEUTRALIZE_VOTE_THREAD",
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

function asyncCreateThread({ title, body, category = null }) {
    return async (dispatch) => {
        try {
            const thread = await api.createThread(title, body, category);
            dispatch(createThreadActionCreator(thread));
        } catch (error) {
            alert(error.message);
        }
    };
}

export { ActionType, receiveThreadsActionCreator, asyncCreateThread };
