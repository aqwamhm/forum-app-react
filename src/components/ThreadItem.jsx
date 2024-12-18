import { Link } from 'react-router-dom';
import Votes from './Votes';
import { FaCommentDots, FaTags } from 'react-icons/fa';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils';
import PropTypes from 'prop-types';
import { asyncToggleVoteThread } from '../states/threads/action';

const ThreadItem = ({ thread, authUser }) => {
  return (
    <div key={thread.id} className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-2 flex items-center text-sm text-gray-500">
        <img
          src={thread.user.avatar}
          alt=""
          className="w-5 h-5 rounded-full mr-2"
        />
        <span className="text-xs">
          <b>{thread.user.name}</b> •{' '}
          {showFormattedDate(thread.createdAt)}
        </span>
      </div>
      <Link to={`/threads/${thread.id}`} key={thread.id}>
        <h2 className="text-xl font-semibold text-gray-700 hover:text-blue-900">
          {thread.title}
        </h2>
      </Link>
      <div className="text-gray-600 mt-2">
        {thread.body.length > 300
          ? parser(`${thread.body.substring(0, 200)}...`)
          : parser(thread.body)}
      </div>
      <div className="mt-4 flex items-center text-sm text-gray-500 space-x-8">
        <Votes
          upVotesBy={thread.upVotesBy}
          downVotesBy={thread.downVotesBy}
          objectContentId={{ threadId: thread.id }}
          userId={authUser?.id}
          asyncToggle={asyncToggleVoteThread}
        />
        <span className="flex items-center">
          <FaCommentDots className="mr-1" /> {thread.totalComments}
        </span>
        <span className="flex items-center">
          <FaTags className="mr-1" /> {thread.category}
        </span>
      </div>
    </div>
  );
};

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    user: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  authUser: PropTypes.object,
};

export default ThreadItem;
