import api from "../../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

const ActionType = {
    RECEIVE_THREAD_DETAIL: "RECEIVE_THREAD_DETAIL",
    CLEAR_THREAD_DETAIL: "CLEAR_THREAD_DETAIL",
    ADD_THREAD_COMMENT: "ADD_THREAD_COMMENT",
    TOGGLE_VOTE_THREAD_DETAIL: "TOGGLE_VOTE_THREAD_DETAIL",
    REVERT_VOTE_THREAD_DETAIL: "REVERT_VOTE_THREAD_DETAIL",
    TOGGLE_VOTE_COMMENT: "TOGGLE_VOTE_COMMENT",
    REVERT_VOTE_COMMENT: "REVERT_VOTE_COMMENT",
};

function receiveThreadDetailActionCreator(threadDetail) {
    return {
        type: ActionType.RECEIVE_THREAD_DETAIL,
        payload: {
            threadDetail,
        },
    };
}

function clearThreadDetailActionCreator() {
    return {
        type: ActionType.CLEAR_THREAD_DETAIL,
    };
}

function addThreadCommentActionCreator(comment) {
    return {
        type: ActionType.ADD_THREAD_COMMENT,
        payload: {
            comment,
        },
    };
}

function toggleVoteThreadDetailActionCreator({ threadId, userId, voteType }) {
    return {
        type: ActionType.TOGGLE_VOTE_THREAD_DETAIL,
        payload: {
            threadId,
            userId,
            voteType,
        },
    };
}

function revertVoteThreadDetailActionCreator({
    threadId,
    userId,
    previousVoteType,
}) {
    return {
        type: ActionType.REVERT_VOTE_THREAD_DETAIL,
        payload: {
            threadId,
            userId,
            previousVoteType,
        },
    };
}

function toggleVoteCommentActionCreator({ commentId, userId, voteType }) {
    return {
        type: ActionType.TOGGLE_VOTE_COMMENT,
        payload: {
            commentId,
            userId,
            voteType,
        },
    };
}

function revertVoteCommentActionCreator({
    commentId,
    userId,
    previousVoteType,
}) {
    return {
        type: ActionType.REVERT_VOTE_COMMENT,
        payload: {
            commentId,
            userId,
            previousVoteType,
        },
    };
}

function asyncReceiveThreadDetail(threadId) {
    return async (dispatch) => {
        dispatch(showLoading());
        dispatch(clearThreadDetailActionCreator());

        try {
            const threadDetail = await api.getThreadDetail(threadId);
            dispatch(receiveThreadDetailActionCreator(threadDetail));
        } catch (error) {
            alert(error.message);
        } finally {
            dispatch(hideLoading());
        }
    };
}

function asyncAddThreadComment({ threadId, content }) {
    return async (dispatch) => {
        dispatch(showLoading());

        try {
            const comment = await api.createComment({ threadId, content });
            dispatch(addThreadCommentActionCreator(comment));
        } catch (error) {
            alert(error.message);
        } finally {
            dispatch(hideLoading());
        }
    };
}

function asyncToggleVoteThreadDetail({ threadId, userId, voteType }) {
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
        dispatch(
            toggleVoteThreadDetailActionCreator({ threadId, userId, voteType })
        );

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
                revertVoteThreadDetailActionCreator({
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

function asyncToggleVoteComment({ commentId, userId, voteType }) {
    return async (dispatch, getState) => {
        const state = getState();
        const currentComment = state.threadDetail.comments.find(
            (comment) => comment.id === commentId
        );
        let previousVoteType = 0;

        if (currentComment) {
            if (currentComment.upVotesBy.includes(userId)) {
                previousVoteType = 1;
            } else if (currentComment.downVotesBy.includes(userId)) {
                previousVoteType = -1;
            }
        }

        dispatch(showLoading());
        dispatch(
            toggleVoteCommentActionCreator({ commentId, userId, voteType })
        );

        try {
            if (voteType === 1) {
                await api.upVoteComment({
                    threadId: state.threadDetail.id,
                    commentId,
                });
            } else if (voteType === -1) {
                await api.downVoteComment({
                    threadId: state.threadDetail.id,
                    commentId,
                });
            } else if (voteType === 0) {
                await api.neutralizeVoteComment({
                    threadId: state.threadDetail.id,
                    commentId,
                });
            }
        } catch (error) {
            dispatch(
                revertVoteCommentActionCreator({
                    commentId,
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
    receiveThreadDetailActionCreator,
    clearThreadDetailActionCreator,
    toggleVoteThreadDetailActionCreator,
    revertVoteThreadDetailActionCreator,
    toggleVoteCommentActionCreator,
    revertVoteCommentActionCreator,
    addThreadCommentActionCreator,
    asyncToggleVoteThreadDetail,
    asyncToggleVoteComment,
    asyncReceiveThreadDetail,
    asyncAddThreadComment,
};
