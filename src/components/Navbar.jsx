import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";


const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log me out!'
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire(
                            'Logged out!',
                            'You have been logged out.',
                            'success'
                        )
                    });
            }
        });
    };









    const links = <>
        <li><Link>Home</Link></li>
        <li><Link to="dashboard">Dashboard</Link></li>
        <li><Link to="contact-us">Contact Us</Link></li>

    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                    <h1 className="text-lg font-bold mr-4">Hi, <span className="font-medium">{user.displayName}</span></h1>
                        {
                            <div className="dropdown dropdown-hover dropdown-end z-10">
                                <div tabIndex={0} role="button" className=" m-1">
                                    {
                                        user.photoURL ?
                                            <img className=" w-12 h-12 rounded-full" src={user.photoURL} alt="User Profile" />
                                            :
                                            <FaUser className="text-3xl" />
                                    }
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li><Link to={`/users/${user?.email}`} className="btn">Update Profile</Link></li>
                                    <li ><Link onClick={handleLogout} className="btn">Log Out</Link></li>
                                </ul>
                            </div>
                        }
                    </>
                        :
                        <Link to="login" className="btn">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;