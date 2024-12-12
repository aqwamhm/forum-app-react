import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  asyncAddThreadComment,
  asyncReceiveThreadDetail,
  asyncToggleVoteThreadDetail,
} from '../states/threadDetail/action';
import { FaCommentDots, FaTags } from 'react-icons/fa';
import Votes from '../components/Votes';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils';
import CommentList from '../components/CommentList';
import CreateCommentForm from '../components/CreateCommentForm';

const ThreadDetail = () => {
  const { threadId } = useParams();

  const { authUser, threadDetail: thread = null } = useSelector(
    (states) => states
  );
  const dispatch = useDispatch();

  const handleSubmit = (comment) => {
    dispatch(asyncAddThreadComment({ threadId, content: comment }));
  };

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [threadId, dispatch]);

  if (!thread) {
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {thread.title}
        </h1>
        <div className="flex items-center mb-4">
          <img
            src={thread.owner.avatar}
            alt={thread.owner.name}
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              {thread.owner.name}
            </h2>
            <small className="text-gray-600">
              {showFormattedDate(thread.createdAt)}
            </small>
          </div>
        </div>
        <div className="text-gray-600 mb-6">{parser(thread.body)}</div>
        <div className="mt-4 flex items-center text-sm text-gray-500 space-x-8">
          <Votes
            upVotesBy={thread.upVotesBy}
            downVotesBy={thread.downVotesBy}
            objectContentId={{ threadId: thread.id }}
            userId={authUser?.id}
            asyncToggle={asyncToggleVoteThreadDetail}
          />
          <span className="flex items-center">
            <FaCommentDots className="mr-1" />{' '}
            {thread.comments.length}
          </span>
          <span className="flex items-center">
            <FaTags className="mr-1" /> {thread.category}
          </span>
        </div>
        <div className="mt-6">
          <CreateCommentForm onSubmit={handleSubmit} />
          <CommentList
            comments={thread.comments}
            authUser={authUser}
          />
        </div>
      </div>
    </div>
  );
};

export default ThreadDetail;
