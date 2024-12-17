/**
 * test scenario for users action
 *
 * - asyncRegisterUser thunk
 *  - should dispatch actions correctly on success
 *  - should dispatch actions correctly on failure
 *
 */

import { asyncRegisterUser } from "./action";
import api from "../../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { vi, expect, beforeEach, afterEach, describe, it } from "vitest";

const mockUser = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
};
const mockError = new Error("Registration failed");

beforeEach(() => {
    api._registerUser = api.registerUser;
});

afterEach(() => {
    api.registerUser = api._registerUser;
    delete api._registerUser;
});

describe("asyncRegisterUser thunk", () => {
    it("should dispatch actions correctly on success", async () => {
        api.registerUser = vi.fn();
        const dispatch = vi.fn();

        await asyncRegisterUser(mockUser)(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(api.registerUser).toHaveBeenCalledWith(mockUser);
    });

    it("should dispatch actions correctly on failure", async () => {
        api.registerUser = vi.fn(() => Promise.reject(mockError));

        const dispatch = vi.fn();

        await expect(() =>
            asyncRegisterUser(mockUser)(dispatch)
        ).rejects.toThrow(mockError);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(api.registerUser).toHaveBeenCalledWith(mockUser);
    });
});
