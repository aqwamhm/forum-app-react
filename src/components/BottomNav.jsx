import { Link } from "react-router-dom";
import { FaHome, FaTrophy, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const BottomNav = () => {
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
        </div>
    );
};

export default BottomNav;
