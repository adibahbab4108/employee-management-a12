import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const AllEmployee = () => {
    const axiosPublic = useAxiosPublic();
    const [view, setView] = useState(true)
    const { data: all_Employee, refetch } = useQuery({
        queryKey: ["allEmployee"],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/all-user')
            return data;
        }
    })
    const handleMakeHR = (id) => {
        const user = all_Employee.find((employee) => employee._id === id);
        // Confirmation dialog
        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make HR",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axiosPublic.patch("/admin/make-hr", { id });
                if (response.data.acknowledged) {
                    refetch()
                    Swal.fire({
                        title: "Congratulations!",
                        text: `${user.name} is now HR!`,
                        icon: "success",
                    });
                } else {
                    Swal.fire({
                        title: "Oh No!",
                        text: `${response.data.message}`,
                        icon: "warning",
                    });
                }
            }
        });
    }
    const handleFire = async (id) => {
        // Find the employee to be fired
        const user = all_Employee.find((employee) => employee._id === id);

        if (!user) {
            Swal.fire({
                title: "Error",
                text: "Employee not found.",
                icon: "error",
            });
            return;
        }

        // Confirmation dialog
        Swal.fire({
            title: "Are you sure?",
            text: `You are about to fire ${user.name}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, fire!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Fire the employee via API call
                    const response = await axiosPublic.post("/admin/fire-employee", {
                        name: user.name,
                        email: user.email,
                    });

                    if (response.data.acknowledged) {
                        Swal.fire({
                            title: "Fired!",
                            text: `${user.name} has been fired.`,
                            icon: "success",
                        });
                    } else {
                        Swal.fire({
                            title: `${response.data.message}`,
                            icon: "warning",
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: "An error occurred while firing the employee.",
                        icon: "error",
                    });
                    console.error("Error firing employee:", error);
                }
            }
        });
    };

    const handleUpdateSalary = async (e, id) => {
        const salary = e.target.value;
        const { data } = await axiosPublic.patch("/admin/update-salary", { id, salary })
        if (data.modifiedCount > 0) {
            Swal.fire({
                title: "Salary Updated",
                icon: "success",
            });
        }
        if (!data.acknowledged) {
            Swal.fire({
                title: `${data.message}`,
            });
        }
    }

    return (
        <div>
            <button onClick={() => setView(!view)}
                className={` px-6 py-3  rounded-full  ${view
                    ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg hover:shadow-2xl"
                    : "bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg hover:shadow-2xl"
                    }`}
            >{view ? "Grid View" : "Table View"}</button>
            {
                view ? <>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className='text-blue-900'>
                                    <th>Name</th>
                                    <th>Designation</th>
                                    <th>Salary ($)</th>
                                    <th>Make HR</th>
                                    <th>Fire</th>
                                </tr>
                            </thead>
                            <tbody>
                                {all_Employee
                                    ?.filter((employee) => employee.isVerified)
                                    .map((employee) => (
                                        <tr key={employee._id}>
                                            <td>{employee.name}</td>
                                            <td>{employee.designation}</td>
                                            <td>
                                                <input
                                                    onBlur={(e) => handleUpdateSalary(e, employee._id)}
                                                    type="number"
                                                    defaultValue={employee.salary}
                                                    disabled={employee.role === "admin"}
                                                    className='text-center w-24 rounded-md '
                                                />
                                            </td>
                                            <td>
                                                {employee.role === "admin" ? (
                                                    <button className="btn btn-xs cursor-wait bg-green-300 ">Admin</button>
                                                ) : employee.role !== "hr" ? (
                                                    <button
                                                        onClick={() => handleMakeHR(employee._id)}
                                                        className="btn btn-xs btn-primary"
                                                    >
                                                        Make HR
                                                    </button>
                                                ) : (
                                                    <button className="btn btn-xs btn-info">HR</button>
                                                )}

                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleFire(employee._id)}
                                                    className="btn btn-error btn-xs text-white"
                                                    disabled={employee.role === "admin"}
                                                >
                                                    Fire

                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </> : <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        {all_Employee
                            ?.filter((employee) => employee.isVerified)
                            .map((employee) => (
                                <div
                                    key={employee._id}
                                    className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
                                >
                                    <h3 className="text-lg font-semibold text-gray-800">{employee.name}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{employee.designation}</p>
                                    <div className="mt-2">
                                        <label className="text-sm font-semibold text-gray-700">Salary ($):</label>
                                        <input
                                            onBlur={(e) => handleUpdateSalary(e, employee._id)}
                                            type="number"
                                            defaultValue={employee.salary}
                                            className="block w-full mt-1 px-2 py-1 border rounded-md text-center"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <div>
                                            {employee.role !== "hr" ? (
                                                <button
                                                    onClick={() => handleMakeHR(employee._id)}
                                                    className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-md hover:bg-blue-600"
                                                >
                                                    Make HR
                                                </button>
                                            ) : (
                                                <span className="px-3 py-1 bg-blue-300 text-white text-xs font-semibold rounded-md">
                                                    HR
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => handleFire(employee._id)}
                                                className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-md hover:bg-red-600"
                                            >
                                                Fire
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                </>
            }
        </div>

    );
};

export default AllEmployee;