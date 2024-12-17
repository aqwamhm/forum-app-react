import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import api from "../../utils/api";
import {
    asyncSetAuthUser,
    asyncUnsetAuthUser,
    setAuthUserActionCreator,
    unsetAuthUserActionCreator,
} from "./action";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const fakeToken = "fake-token";
const fakeAuthUser = {
    id: 1,
    email: "fake@email.com",
    name: "Fake Name",
    avatar: "fake-avatar",
};
const fakeErrorResponse = new Error("fake error");

beforeEach(() => {
    api._loginUser = api.loginUser;
    api._getOwnProfile = api.getOwnProfile;
    api._putAccessToken = api.putAccessToken;
});

afterEach(() => {
    api.loginUser = api._loginUser;
    api.getOwnProfile = api._getOwnProfile;
    api.putAccessToken = api._putAccessToken;

    delete api._loginUser;
    delete api._getOwnProfile;
    delete api._putAccessToken;
});

describe("asyncSetAuthUser thunk", () => {
    it("should dispatch action correctly when data fetching is success", async () => {
        api.loginUser = () => Promise.resolve(fakeToken);
        api.putAccessToken = vi.fn();
        api.getOwnProfile = () => Promise.resolve(fakeAuthUser);

        const dispatch = vi.fn();

        await asyncSetAuthUser({
            email: "fake@email.com",
            password: "fake-password",
        })(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(
            setAuthUserActionCreator(fakeAuthUser)
        );
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should dispatch action correctly when data fetching is failed", async () => {
        api.loginUser = () => Promise.reject(fakeErrorResponse);
        api.putAccessToken = vi.fn();

        const dispatch = vi.fn();

        await expect(() =>
            asyncSetAuthUser({
                email: "fake@email.com",
                password: "fake-password",
            })(dispatch)
        ).rejects.toThrow(fakeErrorResponse);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).not.toHaveBeenCalledWith(
            setAuthUserActionCreator(fakeAuthUser)
        );
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
});

describe("asyncUnsetAuthUser thunk", () => {
    it("should dispatch action correctly when data fetching is success", async () => {
        api.putAccessToken = () => vi.fn();

        const dispatch = vi.fn();

        asyncUnsetAuthUser()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should dispatch action correctly when data fetching is failed", async () => {
        api.putAccessToken = () => {
            throw fakeErrorResponse;
        };

        const dispatch = vi.fn();

        expect(() => asyncUnsetAuthUser()(dispatch)).toThrow(fakeErrorResponse);
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
});
