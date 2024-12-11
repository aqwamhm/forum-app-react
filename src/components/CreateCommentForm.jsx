import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const CreateCommentForm = ({ onSubmit }) => {
    const [comment, setComment] = useState("");
    const { authUser } = useSelector((state) => state);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(comment);
        setComment("");
    };

    if (!authUser) {
        return (
            <div className="mb-6">
                <p className="text-gray-500">
                    You need to log in to post a comment.
                </p>
            </div>
        );
    }

    return (
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
    );
};

CreateCommentForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default CreateCommentForm;
