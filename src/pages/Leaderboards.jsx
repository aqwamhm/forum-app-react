import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncReceiveLeaderboards } from "../states/leaderboards/action";

const Leaderboards = () => {
    const dispatch = useDispatch();
    const { leaderboards } = useSelector((state) => state);

    useEffect(() => {
        dispatch(asyncReceiveLeaderboards());
    }, [dispatch]);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Leaderboards
            </h1>
            <div className="space-y-4">
                {leaderboards.map((entry, index) => (
                    <div
                        key={entry.user.id}
                        className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
                    >
                        <div className="flex items-center">
                            <span className="text-gray-500 mr-4">
                                {index + 1}
                            </span>
                            <img
                                src={entry.user.avatar}
                                alt={entry.user.name}
                                className="w-10 h-10 rounded-full mr-4"
                            />
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700">
                                    {entry.user.name}
                                </h2>
                            </div>
                        </div>
                        <span className="text-gray-700 font-semibold">
                            {entry.score} points
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboards;
