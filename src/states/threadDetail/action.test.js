/**
 * test scenario for threadDetail action
 *
 * - asyncReceiveThreadDetail thunk
 *  - should dispatch actions correctly on success
 *  - should dispatch actions correctly on failure
 * - asyncAddThreadComment thunk
 *  - should dispatch actions correctly on success
 *  - should dispatch actions correctly on failure
 * - asyncToggleVoteThreadDetail thunk
 *  - should dispatch actions correctly on success
 *  - should dispatch actions correctly on failure
 * - asyncToggleVoteComment thunk
 *  - should dispatch actions correctly on success
 *  - should dispatch actions correctly on failure
 *
 */

import {
    asyncReceiveThreadDetail,
    asyncAddThreadComment,
    asyncToggleVoteThreadDetail,
    asyncToggleVoteComment,
} from "./action";
import api from "../../utils/api";
import {
    receiveThreadDetailActionCreator,
    clearThreadDetailActionCreator,
    addThreadCommentActionCreator,
    toggleVoteThreadDetailActionCreator,
    revertVoteThreadDetailActionCreator,
    toggleVoteCommentActionCreator,
    revertVoteCommentActionCreator,
} from "./action";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockThreadId = 1;
const mockThreadDetail = {
    id: mockThreadId,
    title: "Thread Title",
    content: "Thread Content",
    comments: [],
};

const mockComment = {
    id: 1,
    content: "Comment Content",
};

const mockVoteType = 1;
const mockUserId = 1;

const mockError = new Error("API error");

beforeEach(() => {
    api._getThreadDetail = api.getThreadDetail;
    api._createComment = api.createComment;
    api._upVoteThread = api.upVoteThread;
    api._downVoteThread = api.downVoteThread;
    api._neutralizeVoteThread = api.neutralizeVoteThread;
    api._upVoteComment = api.upVoteComment;
    api._downVoteComment = api.downVoteComment;
    api._neutralizeVoteComment = api.neutralizeVoteComment;
    vi.spyOn(window, "alert");
});

afterEach(() => {
    api.getThreadDetail = api._getThreadDetail;
    api.createComment = api._createComment;
    api.upVoteThread = api._upVoteThread;
    api.downVoteThread = api._downVoteThread;
    api.neutralizeVoteThread = api._neutralizeVoteThread;
    api.upVoteComment = api._upVoteComment;
    api.downVoteComment = api._downVoteComment;
    api.neutralizeVoteComment = api._neutralizeVoteComment;
    delete api._getThreadDetail;
    delete api._createComment;
    delete api._upVoteThread;
    delete api._downVoteThread;
    delete api._neutralizeVoteThread;
    delete api._upVoteComment;
    delete api._downVoteComment;
    delete api._neutralizeVoteComment;
    vi.restoreAllMocks();
});

describe("asyncReceiveThreadDetail thunk", () => {
    it("should dispatch actions correctly on success", async () => {
        api.getThreadDetail = () => Promise.resolve(mockThreadDetail);
        window.alert = vi.fn();

        const dispatch = vi.fn();

        await asyncReceiveThreadDetail(mockThreadId)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
        expect(dispatch).toHaveBeenCalledWith(
            receiveThreadDetailActionCreator(mockThreadDetail)
        );
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).not.toHaveBeenCalled();
    });

    it("should dispatch actions correctly on failure", async () => {
        api.getThreadDetail = () => Promise.reject(mockError);
        window.alert = vi.fn();

        const dispatch = vi.fn();

        await asyncReceiveThreadDetail(mockThreadId)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).toHaveBeenCalledWith(mockError.message);
        expect(dispatch).not.toHaveBeenCalledWith(
            receiveThreadDetailActionCreator(mockThreadDetail)
        );
    });
});

describe("asyncAddThreadComment thunk", () => {
    it("should dispatch actions correctly on success", async () => {
        api.createComment = () => Promise.resolve(mockComment);
        window.alert = vi.fn();

        const dispatch = vi.fn();

        await asyncAddThreadComment({
            threadId: mockThreadId,
            content: "New Comment",
        })(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(
            addThreadCommentActionCreator(mockComment)
        );
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).not.toHaveBeenCalled();
    });

    it("should dispatch actions correctly on failure", async () => {
        api.createComment = () => Promise.reject(mockError);
        window.alert = vi.fn();

        const dispatch = vi.fn();

        await asyncAddThreadComment({
            threadId: mockThreadId,
            content: "New Comment",
        })(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).toHaveBeenCalledWith(mockError.message);
        expect(dispatch).not.toHaveBeenCalledWith(
            addThreadCommentActionCreator(mockComment)
        );
    });
});

describe("asyncToggleVoteThreadDetail thunk", () => {
    it("should dispatch actions correctly on success", async () => {
        api.upVoteThread = () => Promise.resolve();
        window.alert = vi.fn();

        const dispatch = vi.fn();
        const getState = () => ({
            threads: [{ id: mockThreadId, upVotesBy: [], downVotesBy: [] }],
        });

        await asyncToggleVoteThreadDetail({
            threadId: mockThreadId,
            userId: mockUserId,
            voteType: mockVoteType,
        })(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(
            toggleVoteThreadDetailActionCreator({
                threadId: mockThreadId,
                userId: mockUserId,
                voteType: mockVoteType,
            })
        );
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).not.toHaveBeenCalled();
    });

    it("should dispatch actions correctly on failure", async () => {
        api.upVoteThread = () => Promise.reject(mockError);
        window.alert = vi.fn();

        const dispatch = vi.fn();
        const getState = () => ({
            threads: [{ id: mockThreadId, upVotesBy: [], downVotesBy: [] }],
        });

        await asyncToggleVoteThreadDetail({
            threadId: mockThreadId,
            userId: mockUserId,
            voteType: mockVoteType,
        })(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(
            toggleVoteThreadDetailActionCreator({
                threadId: mockThreadId,
                userId: mockUserId,
                voteType: mockVoteType,
            })
        );
        expect(dispatch).toHaveBeenCalledWith(
            revertVoteThreadDetailActionCreator({
                threadId: mockThreadId,
                userId: mockUserId,
                previousVoteType: 0,
            })
        );
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).toHaveBeenCalledWith(mockError.message);
    });
});

describe("asyncToggleVoteComment thunk", () => {
    it("should dispatch actions correctly on success", async () => {
        api.upVoteComment = () => Promise.resolve();
        window.alert = vi.fn();

        const dispatch = vi.fn();
        const getState = () => ({
            threadDetail: {
                id: mockThreadId,
                comments: [{ id: 1, upVotesBy: [], downVotesBy: [] }],
            },
        });

        await asyncToggleVoteComment({
            commentId: 1,
            userId: mockUserId,
            voteType: mockVoteType,
        })(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(
            toggleVoteCommentActionCreator({
                commentId: 1,
                userId: mockUserId,
                voteType: mockVoteType,
            })
        );
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).not.toHaveBeenCalled();
    });

    it("should dispatch actions correctly on failure", async () => {
        api.upVoteComment = () => Promise.reject(mockError);
        window.alert = vi.fn();

        const dispatch = vi.fn();
        const getState = () => ({
            threadDetail: {
                id: mockThreadId,
                comments: [{ id: 1, upVotesBy: [], downVotesBy: [] }],
            },
        });

        await asyncToggleVoteComment({
            commentId: 1,
            userId: mockUserId,
            voteType: mockVoteType,
        })(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(
            toggleVoteCommentActionCreator({
                commentId: 1,
                userId: mockUserId,
                voteType: mockVoteType,
            })
        );
        expect(dispatch).toHaveBeenCalledWith(
            revertVoteCommentActionCreator({
                commentId: 1,
                userId: mockUserId,
                previousVoteType: 0,
            })
        );
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).toHaveBeenCalledWith(mockError.message);
    });
});
