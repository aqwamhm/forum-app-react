import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import BottomNav from "../components/BottomNav";

const MainLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="hidden lg:block">
                <SideBar />
            </div>
            <div className="flex-1">
                <Outlet />
            </div>
            <div className="lg:hidden">
                <BottomNav />
            </div>
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;
