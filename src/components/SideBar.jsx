import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncUnsetAuthUser } from '../states/authUser/action';

const SideBar = () => {
  const { authUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

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
        {authUser ? (
          <button
            onClick={() => onLogout()}
            className="block text-gray-300 hover:text-white"
          >
                        Logout
          </button>
        ) : (
          <>
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
          </>
        )}
      </nav>
    </div>
  );
};

export default SideBar;
