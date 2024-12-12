import FloatingActionButton from '../components/FloatingActionButton';
import { FaCommentDots, FaPlus } from 'react-icons/fa';
import { FaTags } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { Link } from 'react-router-dom';
import Votes from '../components/Votes';
import { asyncToggleVoteThread } from '../states/threads/action';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils';
import CategoryFilter from '../components/CategoryFilter';

const Home = () => {
  const {
    authUser = null,
    threads = [],
    users = [],
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(threads.map((thread) => thread.category)),
    ];
    setCategories(uniqueCategories);
  }, [threads]);

  const onCategoryChange = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
    }
  };

  const threadList = threads
    .filter((thread) =>
      selectedCategory ? thread.category === selectedCategory : true
    )
    .map((thread) => {
      return {
        ...thread,
        user: users.find((user) => user.id === thread.ownerId),
      };
    });

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Home</h1>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
      <div className="space-y-4">
        {threadList.map((thread) => (
          <div
            key={thread.id}
            className="bg-white p-4 rounded-lg shadow-md"
          >
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
                ? parser(`${thread.body.substring(0, 200)  }...`)
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
                <FaCommentDots className="mr-1" />{' '}
                {thread.totalComments}
              </span>
              <span className="flex items-center">
                <FaTags className="mr-1" /> {thread.category}
              </span>
            </div>
          </div>
        ))}
      </div>
      {authUser ? (
        <FloatingActionButton to="/create" icon={<FaPlus />} />
      ) : null}
    </div>
  );
};

export default Home;
