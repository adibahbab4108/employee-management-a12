import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";

const EmployeeList = () => {
    const axiosPublic = useAxiosPublic();
    const { data: employees, refetch } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/employee-list");
            return data;
        },
    });

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    // const [isPending, setIsPending] = useState(true)

    const handleVerification = async (data) => {
        const payload = {
            email: data.email,
            verification: true,
        };

        try {
            const response = await axiosPublic.patch("/user-verification", payload);
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Verification Successful",
                });
            }
            refetch();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Verification Failed",
                text: `${error}`,
            });
        }
    };

    const handlePaymentForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = {
            email: selectedEmployee.email,
            salary: formData.get("salary"),
            month: formData.get("month"),
            year: formData.get("year"),
            isPending: true
        };
        console.log(payload, selectedEmployee)
        try {
            const response = await axiosPublic.post('/payroll', payload);
            console.log(response.data)
            if (response.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Payment Request Created Successfully",
                });
                refetch();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Already paid",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error Creating Payment Request",
                text: `${error}`,
            });
        }
    };

    return (
        <div>
            <h1 className="text-center font-bold text-2xl mt-10 underline mb-5">
                Employee List
            </h1>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verified</th>
                            <th>Bank Account</th>
                            <th>Salary</th>
                            <th>Pay</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees?.map((employee, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>
                                    {employee.isVerified ? (
                                        <span className="btn btn-xs btn-success text-white">
                                            Verified
                                        </span>
                                    ) : (
                                        <div className="flex gap-1 items-center">
                                            <FaTimesCircle className="text-xl text-red-700" />
                                            <button
                                                onClick={() => handleVerification(employee)}
                                                className="text-xl text-green-700"
                                            >
                                                <FaCheckCircle />
                                            </button>
                                        </div>
                                    )}
                                </td>
                                <td>{employee.bank_account_no || "N/A"}</td>
                                <td>{employee.salary || "N/A"}</td>
                                <td>
                                    <button
                                        disabled={!employee.isVerified}
                                        className="btn btn-xs btn-primary"
                                        onClick={() => {
                                            setSelectedEmployee(employee);
                                            document.getElementById("payment-modal").showModal();
                                        }}
                                    >
                                        Pay
                                    </button>
                                </td>
                                <td>
                                    <Link to="/dashboard/employee-details" state={employee} className="btn btn-xs btn-info ">View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Payment Modal */}
            <dialog id="payment-modal" className="modal">
                <div className="modal-box rounded-2xl shadow-lg bg-white">
                    <h2 className="text-lg font-bold text-center mb-4">Employee Payment</h2>
                    <form onSubmit={handlePaymentForm} className="space-y-4">
                        {/* Salary Field */}
                        <div>
                            <label
                                htmlFor="salary"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Salary ($):
                            </label>
                            <input
                                id="salary"
                                name="salary"
                                type="number"
                                value={selectedEmployee?.salary || 0}
                                className="input input-bordered input-primary w-full"
                                readOnly
                            />
                        </div>

                        {/* Month Dropdown */}
                        <div>
                            <label
                                htmlFor="month"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Month:
                            </label>
                            <select
                                id="month"
                                name="month"
                                className="select select-bordered select-primary w-full"
                                required
                            >
                                {[
                                    "January",
                                    "February",
                                    "March",
                                    "April",
                                    "May",
                                    "June",
                                    "July",
                                    "August",
                                    "September",
                                    "October",
                                    "November",
                                    "December",
                                ].map((month) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Year Dropdown */}
                        <div>
                            <label
                                htmlFor="year"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Year:
                            </label>
                            <select
                                id="year"
                                name="year"
                                className="select select-bordered select-primary w-full"
                                required
                            >
                                {Array.from({ length: 11 }, (_, i) =>
                                    new Date().getFullYear() - 5 + i
                                ).map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Modal Actions */}
                        <div className="modal-action justify-center">

                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={() => document.getElementById("payment-modal").close()}
                            >
                                Pay
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default EmployeeList;
