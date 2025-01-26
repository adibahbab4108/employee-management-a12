import React from 'react';
import { useLocation } from 'react-router-dom';
import EmployeeBarChart from './EmployeeBarChart';

const EmployeeDetails = () => {
    const location = useLocation();
    const employee = location.state || {};

    return (
        <>
            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-6 p-4">
                {/* Employee Info Card */}
                <div className="w-full max-w-md bg-white shadow-lg rounded-2xl overflow-hidden">
                    <div className="relative w-full h-48 bg-blue-500">
                        <img
                            src={employee.photo}
                            alt={employee.name}
                            className="absolute inset-0 object-cover w-full h-full"
                        />
                    </div>
                    <div className="p-6 text-center bg-slate-200">
                        <h1 className="text-2xl font-bold text-gray-800">{employee.name}</h1>
                        <p className="text-sm text-gray-500 mt-1">{employee.designation}</p>

                        {employee.isVerified ? (
                            <span className="inline-block px-4 py-1 mt-3 text-sm font-semibold text-white bg-green-500 rounded-full">
                                Verified
                            </span>
                        ) : (
                            <span className="inline-block px-4 py-1 mt-3 text-sm font-semibold text-white bg-red-500 rounded-full">
                                Not Verified
                            </span>
                        )}

                        <div className="mt-6 text-left">
                            <p className="mb-3">
                                <span className="font-semibold">Email:</span> {employee.email}
                            </p>
                            <p className="mb-3">
                                <span className="font-semibold">Role:</span> {employee.role}
                            </p>
                            <p className="mb-3">
                                <span className="font-semibold">Bank Account:</span> {employee.bank_account_no}
                            </p>
                            <p className="mb-3">
                                <span className="font-semibold">Salary:</span> ${employee.salary}
                            </p>
                        </div>

                        <button className="mt-4 px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                            Update Info
                        </button>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="w-full lg:w-2/3 bg-white shadow-lg rounded-2xl p-4">
                    <EmployeeBarChart employee={employee} />
                </div>
            </div>

        </>

    );
};

export default EmployeeDetails;