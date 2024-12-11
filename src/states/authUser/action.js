import api from "../../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

const ActionType = {
    SET_AUTH_USER: "SET_AUTH_USER",
    UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

function setAuthUserActionCreator(authUser) {
    return {
        type: ActionType.SET_AUTH_USER,
        payload: {
            authUser,
        },
    };
}

function unsetAuthUserActionCreator() {
    return {
        type: ActionType.UNSET_AUTH_USER,
        payload: {
            authUser: null,
        },
    };
}

function asyncSetAuthUser({ email, password }) {
    return async (dispatch) => {
        dispatch(showLoading());
        try {
            const token = await api.loginUser({ email, password });
            api.putAccessToken(token);
            const authUser = await api.getOwnProfile();
            dispatch(setAuthUserActionCreator(authUser));
        } finally {
            dispatch(hideLoading());
        }
    };
}

function asyncUnsetAuthUser() {
    return (dispatch) => {
        dispatch(showLoading());
        try {
            dispatch(unsetAuthUserActionCreator());
            api.putAccessToken("");
        } finally {
            dispatch(hideLoading());
        }
    };
}

export {
    ActionType,
    setAuthUserActionCreator,
    unsetAuthUserActionCreator,
    asyncSetAuthUser,
    asyncUnsetAuthUser,
};
