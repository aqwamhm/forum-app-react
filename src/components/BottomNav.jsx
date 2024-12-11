import { Link } from "react-router-dom";
import {
    FaHome,
    FaTrophy,
    FaSignInAlt,
    FaUserPlus,
    FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { asyncUnsetAuthUser } from "../states/authUser/action";

const BottomNav = () => {
    const { authUser } = useSelector((states) => states);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(asyncUnsetAuthUser());
    };

    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-around">
            <Link
                to="/"
                className="flex flex-col items-center text-gray-300 hover:text-white text-xs"
            >
                <FaHome className="text-lg mb-1" />
                Home
            </Link>
            <Link
                to="/leaderboards"
                className="flex flex-col items-center text-gray-300 hover:text-white text-xs"
            >
                <FaTrophy className="text-lg mb-1" />
                Leaderboards
            </Link>
            {authUser ? (
                <button
                    onClick={() => onLogout()}
                    className="flex flex-col items-center text-gray-300 hover:text-white text-xs"
                >
                    <FaSignOutAlt className="text-lg mb-1" />
                    Logout
                </button>
            ) : (
                <>
                    <Link
                        to="/login"
                        className="flex flex-col items-center text-gray-300 hover:text-white text-xs"
                    >
                        <FaSignInAlt className="text-lg mb-1" />
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="flex flex-col items-center text-gray-300 hover:text-white text-xs"
                    >
                        <FaUserPlus className="text-lg mb-1" />
                        Register
                    </Link>
                </>
            )}
        </div>
    );
};

export default BottomNav;
