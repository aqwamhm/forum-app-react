const API_BASE_URL = "https://forum-api.dicoding.dev/v1";

export function putAccessToken(token) {
    localStorage.setItem("accessToken", token);
}

export function getAccessToken() {
    return localStorage.getItem("accessToken");
}

// Function to register a new user
export async function registerUser(name, email, password) {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to register user");
    }
    return data;
}

// Function to log in a user
export async function loginUser(email, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to log in");
    }
    return data;
}

// Function to get all users
export async function getAllUsers() {
    const response = await fetch(`${API_BASE_URL}/users`, {
        method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
    }
    return data;
}

// Function to get the current user's profile
export async function getCurrentUserProfile() {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user profile");
    }
    return data;
}

// Function to create a new thread
export async function createThread(token, title, body, category = "") {
    const response = await fetch(`${API_BASE_URL}/threads`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, body, category }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to create thread");
    }
    return data;
}

// Function to get all threads
export async function getAllThreads() {
    const response = await fetch(`${API_BASE_URL}/threads`, {
        method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch threads");
    }
    return data;
}

// Function to get the details of a specific thread
export async function getThreadDetail(threadId) {
    const response = await fetch(`${API_BASE_URL}/threads/${threadId}`, {
        method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch thread details");
    }
    return data;
}

// Function to create a comment for a specific thread
export async function createComment(token, threadId, content) {
    const response = await fetch(
        `${API_BASE_URL}/threads/${threadId}/comments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ content }),
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to create comment");
    }
    return data;
}

// Function to up-vote a thread
export async function upVoteThread(token, threadId) {
    const response = await fetch(
        `${API_BASE_URL}/threads/${threadId}/up-vote`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to up-vote thread");
    }
    return data;
}

// Function to down-vote a thread
export async function downVoteThread(token, threadId) {
    const response = await fetch(
        `${API_BASE_URL}/threads/${threadId}/down-vote`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to down-vote thread");
    }
    return data;
}

// Function to neutralize a thread vote
export async function neutralizeThreadVote(token, threadId) {
    const response = await fetch(
        `${API_BASE_URL}/threads/${threadId}/neutral-vote`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to neutralize thread vote");
    }
    return data;
}

// Function to up-vote a comment
export async function upVoteComment(token, threadId, commentId) {
    const response = await fetch(
        `${API_BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to up-vote comment");
    }
    return data;
}

// Function to down-vote a comment
export async function downVoteComment(token, threadId, commentId) {
    const response = await fetch(
        `${API_BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to down-vote comment");
    }
    return data;
}

// Function to neutralize a comment vote
export async function neutralizeCommentVote(token, threadId, commentId) {
    const response = await fetch(
        `${API_BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to neutralize comment vote");
    }
    return data;
}

// Function to get the leaderboards
export async function getLeaderboards() {
    const response = await fetch(`${API_BASE_URL}/leaderboards`, {
        method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch leaderboards");
    }
    return data;
}
