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
                        ).then(() => { window.location.reload(); })
                    });
            }
        });
    };

    const links = <>
        <li className="mx-1"><NavLink to="/"
            className={({ isActive }) => isActive ? "bg-primary text-white" : "bg-white"}
        >
            Home
        </NavLink>
        </li>
        <li className="mx-1"><NavLink to="dashboard" className={({ isActive }) => isActive ? "bg-primary text-white" : "bg-white"}>Dashboard</NavLink></li>
        <li className="mx-1"><NavLink to="contact-us" className={({ isActive }) => isActive ? "bg-primary text-white" : "bg-white"}>Contact Us</NavLink></li>
    </>
    return (

        <div className="sticky top-0 z-50 bg-base-100 ">
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <RiMenu2Fill className="text-2xl" />
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
                    <ul className="menu menu-horizontal ">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <>
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
                                        <li><Link to='/user' className="btn bg-secondary text-white">Profile</Link></li>
                                        <li ><Link onClick={handleLogout} className="btn bg-secondary text-white">Log Out</Link></li>
                                    </ul>
                                </div>
                            }
                        </>
                            :
                            <Link to="/login" className="btn bg-primary text-white">Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;