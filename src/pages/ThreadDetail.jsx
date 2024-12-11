import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    asyncAddThreadComment,
    asyncReceiveThreadDetail,
    asyncToggleVoteComment,
    asyncToggleVoteThreadDetail,
} from "../states/threadDetail/action";
import { FaCommentDots, FaTags } from "react-icons/fa";
import Votes from "../components/Votes";
import parser from "html-react-parser";
import { showFormattedDate } from "../utils";

const ThreadDetail = () => {
    const { threadId } = useParams();

    const [comment, setComment] = useState("");

    const { authUser, threadDetail: thread = null } = useSelector(
        (states) => states
    );
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            dispatch(asyncAddThreadComment({ threadId, content: comment }));
            setComment("");
        } catch (error) {
            alert(error.message);
        }
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
                        <FaCommentDots className="mr-1" />{" "}
                        {thread.comments.length}
                    </span>
                    <span className="flex items-center">
                        <FaTags className="mr-1" /> {thread.category}
                    </span>
                </div>
                <div className="mt-6">
                    <form className="mb-6" onSubmit={handleSubmit}>
                        <textarea
                            name="comment"
                            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                            placeholder="Write your comment here..."
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Submit Comment
                        </button>
                    </form>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Comments
                    </h3>
                    {thread.comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="bg-gray-50 p-4 rounded-lg shadow-md mb-4"
                        >
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
                                        {new Date(
                                            comment.createdAt
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-600">
                                {parser(comment.content)}
                            </p>
                            <Votes
                                upVotesBy={comment.upVotesBy}
                                downVotesBy={comment.downVotesBy}
                                objectContentId={{ commentId: comment.id }}
                                userId={authUser?.id}
                                asyncToggle={asyncToggleVoteComment}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThreadDetail;
