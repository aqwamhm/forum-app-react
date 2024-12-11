import api from "../../utils/api";

const ActionType = {
    RECEIVE_USERS: "RECEIVE_USERS",
};

function receiveUsersActionCreator(users) {
    return {
        type: ActionType.RECEIVE_USERS,
        payload: {
            users,
        },
    };
}

function asyncRegisterUser({ email, name, password }) {
    return async () => {
        await api.registerUser({ email, name, password });
    };
}

export { ActionType, receiveUsersActionCreator, asyncRegisterUser };
