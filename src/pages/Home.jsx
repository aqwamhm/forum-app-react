import { BiDownvote, BiUpvote } from "react-icons/bi";
import FloatingActionButton from "../components/FloatingActionButton";
import { FaCommentDots, FaPlus } from "react-icons/fa";
import { FaTags } from "react-icons/fa";

const Home = () => {
    // Mock data for threads
    const threads = [
        {
            id: "thread-1",
            title: "Thread Pertama",
            body: "Ini adalah thread pertama",
            category: "General",
            createdAt: "2021-06-21T07:00:00.000Z",
            ownerId: "users-1",
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
        },
        {
            id: "thread-2",
            title: "Thread Kedua",
            body: "Ini adalah thread kedua",
            category: "General",
            createdAt: "2021-06-21T07:00:00.000Z",
            ownerId: "users-2",
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
        },
    ];

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Home</h1>
            <div className="space-y-4">
                {threads.map((thread) => (
                    <div
                        key={thread.id}
                        className="bg-white p-4 rounded-lg shadow-md"
                    >
                        <div className="mb-2 flex items-center text-sm text-gray-500">
                            <img
                                src=""
                                alt=""
                                className="w-3 h-3 rounded-full mr-2"
                            />
                            <span className="text-xs">
                                <b>John Doe</b> •{" "}
                                {new Date(thread.createdAt).toLocaleString()}
                            </span>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-700">
                            {thread.title}
                        </h2>
                        <p className="text-gray-600 mt-2">{thread.body}</p>
                        <div className="mt-4 flex items-center text-sm text-gray-500 space-x-8">
                            <span className="flex items-center">
                                <BiUpvote className="cursor-pointer text-xl" />
                                <span className="mx-1 font-bold">
                                    {thread.upVotesBy.length}
                                </span>
                                <BiDownvote className="cursor-pointer text-xl" />
                            </span>
                            <span className="flex items-center">
                                <FaCommentDots className="mr-1" />{" "}
                                {thread.totalComments}
                            </span>
                            <span className="flex items-center">
                                <FaTags className="mr-1" /> {thread.category}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <FloatingActionButton to="/create" icon={<FaPlus />} />
        </div>
    );
};

export default Home;
