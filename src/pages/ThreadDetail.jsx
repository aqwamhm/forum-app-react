const ThreadDetail = () => {
    // Mock data for thread detail
    const thread = {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        owner: {
            id: "users-1",
            name: "John Doe",
            avatar: "https://generated-image-url.jpg",
        },
        upVotesBy: [],
        downVotesBy: [],
        comments: [
            {
                id: "comment-1",
                content: "Ini adalah komentar pertama",
                createdAt: "2021-06-21T07:00:00.000Z",
                owner: {
                    id: "users-1",
                    name: "John Doe",
                    avatar: "https://generated-image-url.jpg",
                },
                upVotesBy: [],
                downVotesBy: [],
            },
        ],
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        const commentContent = event.target.comment.value;
        // Logic to submit the comment (e.g., API call)
        console.log("New comment:", commentContent);
    };

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
                        <p className="text-gray-600">
                            {new Date(thread.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
                <p className="text-gray-600 mb-6">{thread.body}</p>
                <div className="mt-6">
                    <form onSubmit={handleCommentSubmit} className="mb-6">
                        <textarea
                            name="comment"
                            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                            placeholder="Write your comment here..."
                            required
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
                            <p className="text-gray-600">{comment.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThreadDetail;
