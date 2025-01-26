import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const AllEmployee = () => {
    const axiosPublic = useAxiosPublic();
    const { data: all_Employee, refetch } = useQuery({
        queryKey: ["allEmployee"],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/all-user')
            return data;
        }
    })
    // console.log(all_Employee)
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
                console.log(response.data)

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
                    console.log(response.data)

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
        console.log(e.target.value, id)
        const salary = e.target.value;
        const { data } = await axiosPublic.patch("/admin/update-salary", { id, salary })
        console.log(data)
        if (data.modifiedCount > 0) {
            Swal.fire({
                title: "Salary Updated",
                icon: "success",
            });
        }

    }

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
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
                                        className='text-center w-24 rounded-md '
                                    />
                                </td>
                                <td>
                                    {employee.role !== "hr" ?
                                        <button
                                            onClick={() => handleMakeHR(employee._id)}
                                            className="btn btn-xs btn-primary"
                                        >
                                            Make HR
                                        </button>
                                        :
                                        <button className='btn btn-xs btn-info'>HR</button>
                                    }
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleFire(employee._id)}
                                        className="btn btn-error btn-xs text-white"
                                    >
                                        Fire

                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllEmployee;