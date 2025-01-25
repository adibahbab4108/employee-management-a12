import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useUserInfo from '../../../hooks/useUserInfo';

const HrDashboard = () => {
    const { userData } = useUserInfo()
    return (
        <>
            <div className="flex">
                {/* SideBar */}
                <div className="w-64 min-h-screen bg-blue-500">
                    <ul className="menu p-4 ">
                        <li className="my-1 ">
                            <NavLink to="/dashboard/employee-list">Employee List</NavLink>

                        </li>
                        <li className="my-1">
                            <NavLink to="/dashboard/payment-history">Payment History</NavLink>
                        </li>
                        <div className="divider"></div>
                        <li className="my-1">
                            <NavLink to="/">Home</NavLink>
                        </li>
                    </ul>
                </div>
                {/* Main Content */}
                <div className="w-full  bg-emerald-400 p-12">
                    <h1 className="text-4xl font-bold">HR Dashboard</h1>
                    <p className="text-xl mt-2 font-semibold">Hi, {userData?.name} <small className="text-slate-600">({userData?.role || "User"})</small></p>
                    <Outlet />
                </div>
            </div>
        </>
    )
};

export default HrDashboard;