/**
 * test scenario for LeaderboardList Component
 *
 * - LeaderboardList Component
 *  - should render the component with an empty leaderboard list
 *  - should render the component with a non-empty leaderboard list
 *
 */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import LeaderboardList from "./LeaderboardList";
import "@testing-library/jest-dom/vitest";

describe("LeaderboardList Component", () => {
    afterEach(() => {
        cleanup();
    });

    it("should render the component with an empty leaderboard list", () => {
        const leaderboards = [];

        render(<LeaderboardList leaderboards={leaderboards} />);

        const message = screen.getByText("No leaderboard entries available.");
        expect(message).toBeInTheDocument();
    });

    it("should render the component with a non-empty leaderboard list", () => {
        const leaderboards = [
            {
                user: {
                    id: "user-1",
                    avatar: "avatar-url",
                    name: "John Doe",
                },
                score: 100,
            },
            {
                user: {
                    id: "user-2",
                    avatar: "another-avatar-url",
                    name: "Jane Smith",
                },
                score: 200,
            },
        ];

        render(<LeaderboardList leaderboards={leaderboards} />);

        const user1Name = screen.getByText("John Doe");
        expect(user1Name).toBeInTheDocument();

        const user2Name = screen.getByText("Jane Smith");
        expect(user2Name).toBeInTheDocument();
    });
});
