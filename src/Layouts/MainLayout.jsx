import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout = () => {
    const location = useLocation();
    const isLoginRegiserPage = location.pathname.includes('/login') || 
    location.pathname.includes('/register') || 
    location.pathname.includes('/dashboard') ||
    location.pathname.includes('/user') 

    return (
        <div>
            {
                !isLoginRegiserPage && <Navbar />
            }
            <div className="min-h-[calc(100vh-292px)]">
                <Outlet />
            </div>
            {
                !isLoginRegiserPage && <Footer />
            }
        </div>
    );
};

export default MainLayout;