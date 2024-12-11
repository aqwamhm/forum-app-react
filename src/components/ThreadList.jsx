import ThreadItem from "./ThreadItem";
import PropTypes from "prop-types";

const ThreadList = ({ threads, users, authUser }) => {
    const threadList = threads.map((thread) => {
        return {
            ...thread,
            user: users.find((user) => user.id === thread.ownerId),
        };
    });

    return (
        <div className="space-y-4">
            {threadList.length === 0 ? (
                <p className="text-gray-500">No threads available.</p>
            ) : (
                threadList.map((thread) => (
                    <ThreadItem
                        key={thread.id}
                        thread={thread}
                        authUser={authUser}
                    />
                ))
            )}
        </div>
    );
};

ThreadList.propTypes = {
    threads: PropTypes.arrayOf(PropTypes.object).isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    authUser: PropTypes.object,
};

export default ThreadList;
