import LeaderboardsItem from './LeaderboardsItem';
import PropTypes from 'prop-types';

const LeaderboardList = ({ leaderboards }) => {
  return (
    <div className="space-y-4">
      {leaderboards.length === 0 ? (
        <p className="text-gray-500">
                    No leaderboard entries available.
        </p>
      ) : (
        leaderboards.map((entry, index) => (
          <LeaderboardsItem
            key={entry.user.id}
            entry={entry}
            index={index}
          />
        ))
      )}
    </div>
  );
};

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LeaderboardList;
