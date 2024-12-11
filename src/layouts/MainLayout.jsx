import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import BottomNav from "../components/BottomNav";
import Loading from "../components/Loading";

const MainLayout = () => {
    return (
        <>
            <Loading />
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
        </>
    );
};

export default MainLayout;
