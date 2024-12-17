/**
 * test scenario for usersReducer
 *
 * - usersReducer function
 *  - should return the initial state as an empty array
 *  - should handle RECEIVE_USERS action
 *  - should handle unknown actions
 *  - should handle initial state as null
 *  - should handle payload users as null
 *  - should handle payload without users
 *
 */

import { describe, it, expect } from "vitest";
import usersReducer from "./reducer";
import { ActionType } from "./action";

describe("usersReducer", () => {
    const initialState = [{ id: 1, name: "User 1" }];
    const newUsers = [{ id: 2, name: "User 2" }];

    it("should return the initial state as an empty array", () => {
        expect(usersReducer()).toEqual([]);
    });

    it("should handle RECEIVE_USERS action", () => {
        const action = {
            type: ActionType.RECEIVE_USERS,
            payload: { users: newUsers },
        };
        const newState = usersReducer(initialState, action);
        expect(newState).toEqual(newUsers);
        expect(newState).not.toBe(initialState);
    });

    it("should handle unknown actions", () => {
        const action = { type: "UNKNOWN_ACTION" };
        const newState = usersReducer(initialState, action);
        expect(newState).toBe(initialState);
    });

    it("should handle initial state as null", () => {
        const action = { type: "UNKNOWN_ACTION" };
        const newState = usersReducer(null, action);
        expect(newState).toBeNull();
    });

    it("should handle payload users as null", () => {
        const action = {
            type: ActionType.RECEIVE_USERS,
            payload: { users: null },
        };
        const newState = usersReducer(initialState, action);
        expect(newState).toBeNull();
    });

    it("should handle payload without users", () => {
        const action = {
            type: ActionType.RECEIVE_USERS,
            payload: {},
        };
        const newState = usersReducer(initialState, action);
        expect(newState).toBeUndefined();
    });
});
