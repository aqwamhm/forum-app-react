import {
    asyncReceiveThreads,
    asyncAddThread,
    asyncToggleVoteThread,
} from "./action";
import api from "../../utils/api";
import {
    receiveThreadsActionCreator,
    addThreadActionCreator,
    toggleVoteThreadActionCreator,
    revertVoteThreadActionCreator,
} from "./action";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockThreads = [
    { id: 1, title: "Thread 1", content: "Content 1" },
    { id: 2, title: "Thread 2", content: "Content 2" },
];

const mockThread = {
    id: 3,
    title: "Thread 3",
    content: "Content 3",
    category: "Category 1",
};

const mockVoteType = 1;
const mockUserId = 1;
const mockThreadId = 1;

const mockError = new Error("API error");

beforeEach(() => {
    api._getAllThreads = api.getAllThreads;
    api._createThread = api.createThread;
    api._upVoteThread = api.upVoteThread;
    api._downVoteThread = api.downVoteThread;
    api._neutralizeVoteThread = api.neutralizeVoteThread;
});

afterEach(() => {
    api.getAllThreads = api._getAllThreads;
    api.createThread = api._createThread;
    api.upVoteThread = api._upVoteThread;
    api.downVoteThread = api._downVoteThread;
    api.neutralizeVoteThread = api._neutralizeVoteThread;
    delete api._getAllThreads;
    delete api._createThread;
    delete api._upVoteThread;
    delete api._downVoteThread;
    delete api._neutralizeVoteThread;
    vi.restoreAllMocks();
});

describe("asyncReceiveThreads thunk", () => {
    it("should dispatch actions correctly on success", async () => {
        api.getAllThreads = () => Promise.resolve(mockThreads);

        const dispatch = vi.fn();

        await asyncReceiveThreads()(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(
            receiveThreadsActionCreator(mockThreads)
        );
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should dispatch actions correctly on failure", async () => {
        api.getAllThreads = () => Promise.reject(mockError);
        const dispatch = vi.fn();

        await expect(() => asyncReceiveThreads()(dispatch)).rejects.toThrow(
            mockError
        );
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
});

describe("asyncAddThread thunk", () => {
    it("should dispatch actions correctly on success", async () => {
        api.createThread = () => Promise.resolve(mockThread);
        const dispatch = vi.fn();

        await asyncAddThread({
            title: mockThread.title,
            body: mockThread.content,
            category: mockThread.category,
        })(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(
            addThreadActionCreator(mockThread)
        );
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should dispatch actions correctly on failure", async () => {
        api.createThread = () => Promise.reject(mockError);
        window.alert = vi.fn();
        const dispatch = vi.fn();

        await expect(
            asyncAddThread({
                title: "New Title",
                body: "New Body",
                category: "New Category",
            })(dispatch)
        ).rejects.toThrow(mockError);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
});

describe("asyncToggleVoteThread thunk", () => {
    it("should dispatch actions correctly on success", async () => {
        api.upVoteThread = () => Promise.resolve();
        window.alert = vi.fn();
        const dispatch = vi.fn();
        const getState = () => ({
            threads: [{ id: mockThreadId, upVotesBy: [], downVotesBy: [] }],
        });

        await asyncToggleVoteThread({
            threadId: mockThreadId,
            userId: mockUserId,
            voteType: mockVoteType,
        })(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(
            toggleVoteThreadActionCreator({
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

        await asyncToggleVoteThread({
            threadId: mockThreadId,
            userId: mockUserId,
            voteType: mockVoteType,
        })(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(
            toggleVoteThreadActionCreator({
                threadId: mockThreadId,
                userId: mockUserId,
                voteType: mockVoteType,
            })
        );
        expect(dispatch).toHaveBeenCalledWith(
            revertVoteThreadActionCreator({
                threadId: mockThreadId,
                userId: mockUserId,
                previousVoteType: 0,
            })
        );
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).toHaveBeenCalledWith(mockError.message);
    });
});
