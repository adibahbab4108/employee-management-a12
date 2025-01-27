import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import useUserInfo from '../../../hooks/useUserInfo';

const HrDashboard = () => {
    const { userData } = useUserInfo()
    const location = useLocation();
    const isProfilePage = location.pathname.includes("/employee-details") ||
        location.pathname.includes("/progress") ||
        location.pathname.includes("/employee-list")
    return (
        <>
            <div className="flex flex-col md:flex-row">
                {/* Sidebar */}
                <div className="w-full md:w-64 md:min-h-screen bg-blue-500">
                    <ul className="menu p-4 text-center md:text-left">
                        <li className="my-1">
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    isActive ? "font-bold text-blue-300" : "hover:text-blue-300"
                                }
                            >
                                Overview
                            </NavLink>
                        </li>
                        <li className="my-1">
                            <NavLink
                                to="/dashboard/employee-list"
                                className={({ isActive }) =>
                                    isActive ? "font-bold text-blue-300" : "hover:text-blue-300"
                                }
                            >
                                Employee List
                            </NavLink>
                        </li>
                        <li className="my-1">
                            <NavLink
                                to="/dashboard/progress"
                                className={({ isActive }) =>
                                    isActive ? "font-bold text-blue-300" : "hover:text-blue-300"
                                }
                            >
                                Progress
                            </NavLink>
                        </li>
                        <div className="divider"></div>
                        <li className="my-1">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? "font-bold text-blue-300" : "hover:text-blue-300"
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-full bg-emerald-400 p-6 md:p-12">
                    {!isProfilePage && (
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold">HR Dashboard</h1>
                            <p className="text-lg md:text-xl mt-2 font-semibold">
                                Hi, {userData?.name}{" "}
                                <small className="text-slate-600">
                                    ({userData?.role || "User"})
                                </small>
                            </p>
                        </div>
                    )}
                    <Outlet />
                </div>
            </div>

        </>
    )
};

export default HrDashboard;