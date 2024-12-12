import CommentItem from './CommentItem';
import PropTypes from 'prop-types';

const CommentList = ({ comments, authUser }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Comments
      </h3>
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments available.</p>
      ) : (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            authUser={authUser}
          />
        ))
      )}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  authUser: PropTypes.object,
};

export default CommentList;
