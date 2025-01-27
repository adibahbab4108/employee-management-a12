import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Payroll = () => {
    const axiosPublic = useAxiosPublic();
const [paymentStatusBtn, setPaymentStatusBtn] =useState("Pending")
    const { data: employeePayroll, refetch } = useQuery({
        queryKey: ['payroll'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/admin/payroll')
            return data
        }
    })

    const handlePay = async (id) => {
        
        const { data } = await axiosPublic.patch('/admin/update-payroll-status', { id })
        
        if (data.modifiedCount > 0) {
            Swal.fire({
                title: 'Payment Approved',
                icon: "success"
            })
            refetch()
        }
    };


    return (
        <div className="overflow-x-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Employee Payroll</h1>
            <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg">
                <thead className="bg-teal-800 text-white">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Salary</th>
                        <th className="border border-gray-300 px-4 py-2">Month</th>
                        <th className="border border-gray-300 px-4 py-2">Year</th>
                        <th className="border border-gray-300 px-4 py-2">Payment Status</th>
                        <th className="border border-gray-300 px-4 py-2">Payment Date</th>
                        <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employeePayroll?.map((entry) => (
                        <tr key={entry._id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{entry.email}</td>
                            <td className="border border-gray-300 px-4 py-2">${entry.salary}</td>
                            <td className="border border-gray-300 px-4 py-2">{entry.month}</td>
                            <td className="border border-gray-300 px-4 py-2">{entry.year}</td>
                            <td className="border border-gray-300 px-4 py-2">{entry.isPending ? paymentStatusBtn : "Approved"}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : "-"}
                            </td>
                            <td className="border bg-teal-800 px-4 py-2 text-center">
                                <button className="text-red-600 text-xl mr-2"

                                ><FaTimesCircle /></button>
                                <button
                                    onClick={() => handlePay(entry._id)}
                                    disabled={!entry.isPending}
                                    className={` text-xl ${!entry.isPending ? "text-gray-400" : "text-green-500"}`
                                    }
                                ><FaCheckCircle /></button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default Payroll;