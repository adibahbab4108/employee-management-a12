import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { RiMenu2Fill } from "react-icons/ri";


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
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="dashboard">Dashboard</NavLink></li>
        <li><NavLink to="contact-us">Contact Us</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <RiMenu2Fill className="text-2xl"/>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl hidden  md:flex">Employee Management</a>
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
                                    <li><Link to='/user' className="btn">Profile</Link></li>
                                    <li ><Link onClick={handleLogout} className="btn">Log Out</Link></li>
                                </ul>
                            </div>
                        }
                    </>
                        :
                        <Link to="/login" className="btn">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;