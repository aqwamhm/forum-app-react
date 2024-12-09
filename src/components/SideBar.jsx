import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div className="w-64 bg-gray-800 text-white h-full">
            <nav className="space-y-4 px-4 py-6">
                <Link to="/" className="block text-gray-300 hover:text-white">
                    Home
                </Link>
                <Link
                    to="/leaderboards"
                    className="block text-gray-300 hover:text-white"
                >
                    Leaderboards
                </Link>
                <Link
                    to="/login"
                    className="block text-gray-300 hover:text-white"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="block text-gray-300 hover:text-white"
                >
                    Register
                </Link>
            </nav>
        </div>
    );
};

export default SideBar;
