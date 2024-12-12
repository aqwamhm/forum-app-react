import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardList from '../components/LeaderboardList';

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
      <LeaderboardList leaderboards={leaderboards} />
    </div>
  );
};

export default Leaderboards;
