import FloatingActionButton from "../components/FloatingActionButton";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import CategoryFilter from "../components/CategoryFilter";
import ThreadList from "../components/ThreadList";

const Home = () => {
    const {
        authUser = null,
        threads = [],
        users = [],
    } = useSelector((states) => states);

    const dispatch = useDispatch();

    const [selectedCategory, setSelectedCategory] = useState("");
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
            setSelectedCategory("");
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
            <ThreadList
                threads={threadList}
                users={users}
                authUser={authUser}
            />
            {authUser ? (
                <FloatingActionButton to="/create" icon={<FaPlus />} />
            ) : null}
        </div>
    );
};

export default Home;
