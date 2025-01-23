import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout = () => {
    const location = useLocation();
    const isLoginRegiserPage = location.pathname.includes('/login') || location.pathname.includes('/register')

    return (
        <div>
            {
                !isLoginRegiserPage && <Navbar />
            }
            <Outlet />
            {
                !isLoginRegiserPage && <Footer />
            }
        </div>
    );
};

export default MainLayout;