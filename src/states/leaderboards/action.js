import api from "../../utils/api";

const ActionType = {
    RECEIVE_LEADERBOARDS: "RECEIVE_LEADERBOARDS",
};

function receiveLeaderboardsActionCreator(leaderboards) {
    return {
        type: ActionType.RECEIVE_LEADERBOARDS,
        payload: {
            leaderboards,
        },
    };
}

async function asyncReceiveLeaderboards() {
    try {
        const leaderboards = await api.getLeaderboards();
        return receiveLeaderboardsActionCreator(leaderboards);
    } catch (error) {
        alert(error.message);
    }
}

export {
    ActionType,
    receiveLeaderboardsActionCreator,
    asyncReceiveLeaderboards,
};
