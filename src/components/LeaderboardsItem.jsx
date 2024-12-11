import PropTypes from "prop-types";

const LeaderboardsItem = ({ entry, index }) => {
    return (
        <div
            key={entry.user.id}
            className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
        >
            <div className="flex items-center">
                <span className="text-gray-500 mr-4">{index + 1}</span>
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
    );
};

LeaderboardsItem.propTypes = {
    entry: PropTypes.shape({
        user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired,
        score: PropTypes.number.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
};

export default LeaderboardsItem;
