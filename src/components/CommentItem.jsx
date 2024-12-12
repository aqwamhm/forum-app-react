import Votes from './Votes';
import parser from 'html-react-parser';
import PropTypes from 'prop-types';
import { asyncToggleVoteComment } from '../states/threadDetail/action';

const CommentItem = ({ comment, authUser }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center mb-2">
        <img
          src={comment.owner.avatar}
          alt={comment.owner.name}
          className="w-8 h-8 rounded-full mr-4"
        />
        <div>
          <h4 className="text-md font-semibold text-gray-700">
            {comment.owner.name}
          </h4>
          <p className="text-gray-600">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <p className="text-gray-600">{parser(comment.content)}</p>
      <Votes
        upVotesBy={comment.upVotesBy}
        downVotesBy={comment.downVotesBy}
        objectContentId={{ commentId: comment.id }}
        userId={authUser?.id}
        asyncToggle={asyncToggleVoteComment}
      />
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  authUser: PropTypes.object,
};

export default CommentItem;
