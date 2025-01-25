import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaCheckCircle, FaCross, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const EmployeeList = () => {
    const axiosPublic = useAxiosPublic();
    const { data: employees ,refetch} = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/employee-list')
            return data
        }
    })
    console.log(employees)
    const handleVerification = async (data) => {
        console.log(data.email)

        const payload = {
            email: data.email,
            verification: true
        }

        try {
            const response = await axiosPublic.patch('/user-verification', payload);
            console.log(response.data)
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Verification Successfull",
                })
            }
            refetch();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Verification Failed",
                text: `${error}`,
            })
        }
    };
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
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
                        {/* row 1 */}
                        {
                            employees?.map((employee, index) => (
                                <tr>
                                    <th>{index + 1}</th>
                                    <th>{employee.name}</th>
                                    <td>{employee.email}</td>
                                    <td>{employee.isVerified ?
                                        <span className="btn btn-xs btn-success text-white">verified</span>
                                        :
                                        <div className="flex gap-1">
                                            <button>
                                                <FaTimesCircle className="text-xl text-red-700 " />
                                            </button>
                                            <button onClick={() => handleVerification(employee)}>
                                                <FaCheckCircle className="text-xl text-green-700" />
                                            </button>
                                            {/* <span className="btn btn-xs btn-error text-white text-">Not Verified</span> */}
                                        </div>
                                    }
                                    </td>
                                    <td>{employee.bank_account_no || "Not updated"}</td>
                                    <td>{employee.salary || "Not updated"}</td>
                                    <td ><span disabled={!employee.isVerified} className="btn btn-xs btn-primary ">Pay</span></td>
                                    <td></td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;