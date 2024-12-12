import {
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
  BiSolidDownvote,
} from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

const Votes = ({
  upVotesBy,
  downVotesBy,
  objectContentId,
  userId,
  asyncToggle,
}) => {
  const dispatch = useDispatch();

  const currentVote = upVotesBy.includes(userId)
    ? 1
    : downVotesBy.includes(userId)
      ? -1
      : 0;

  const handleUpvoteClick = () => {
    if (userId == null) {
      alert('You are not authenticated');
      return;
    }
    if (currentVote === 1) {
      dispatch(
        asyncToggle({
          ...objectContentId,
          userId,
          voteType: 0,
        })
      );
    } else {
      dispatch(
        asyncToggle({
          ...objectContentId,
          userId,
          voteType: 1,
        })
      );
    }
  };

  const handleDownvoteClick = () => {
    if (userId == null) {
      alert('You are not authenticated');
      return;
    }
    if (currentVote === -1) {
      dispatch(
        asyncToggle({
          ...objectContentId,
          userId,
          voteType: 0,
        })
      );
    } else {
      dispatch(
        asyncToggle({
          ...objectContentId,
          userId,
          voteType: -1,
        })
      );
    }
  };

  return (
    <span className="flex items-center">
      <span
        className="cursor-pointer text-xl"
        onClick={handleUpvoteClick}
      >
        {currentVote === 1 ? <BiSolidUpvote /> : <BiUpvote />}
      </span>
      <span className="mx-1 font-bold">
        {upVotesBy.length - downVotesBy.length}
      </span>
      <span
        className="cursor-pointer text-xl"
        onClick={handleDownvoteClick}
      >
        {currentVote === -1 ? <BiSolidDownvote /> : <BiDownvote />}
      </span>
    </span>
  );
};

Votes.propTypes = {
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  objectContentId: PropTypes.object.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  asyncToggle: PropTypes.func.isRequired,
};

export default Votes;
