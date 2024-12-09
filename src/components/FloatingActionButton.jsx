import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import PropTypes from "prop-types";

const FloatingActionButton = ({ to, icon }) => {
    return (
        <Link
            to={to}
            className="fixed bottom-20 lg:bottom-4 right-4 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700"
        >
            <IconContext.Provider value={{ className: "h-6 w-6" }}>
                {icon}
            </IconContext.Provider>
        </Link>
    );
};

FloatingActionButton.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
};

export default FloatingActionButton;
